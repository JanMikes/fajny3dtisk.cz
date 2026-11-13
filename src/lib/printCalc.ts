/**
 * printCalc.ts — pure geometry + pricing math. NO Three.js, NO DOM.
 *
 * Kept framework-agnostic on purpose:
 *  • it's trivially unit-testable, and
 *  • the Phase-B upgrade (a real in-browser slicer) only needs to provide a new
 *    `Estimator` implementation — the UI talks to the `Estimator` interface, so
 *    nothing else changes.
 *
 * IMPORTANT: every number this produces is a ROUGH ESTIMATE derived from the
 * model's volume. It is NOT a slice. The UI must present it as approximate.
 */

import {
  GEOMETRY,
  PRICING,
  PRINTER,
  getMaterial,
  getQuality,
  pricePerGram,
  type Material,
} from './materials';

/** Raw geometric facts about a mesh, in millimetres. */
export interface GeometryStats {
  /** absolute mesh volume (mm³) */
  volumeMm3: number;
  /** raw signed volume (mm³) — sign/magnitude used for sanity checks */
  signedVolumeMm3: number;
  /** total surface area (mm²) */
  areaMm2: number;
  /** bounding-box dimensions (mm) */
  size: { x: number; y: number; z: number };
  /** triangle count */
  triangles: number;
  /**
   * Surface area split by how each face tilts against the print direction
   * (Z up, as uploaded). Bin i covers a slice of the unit normal's Z
   * component, from -1 (facing straight down) to +1 (facing straight up).
   * Lets the estimator tell side walls from top/bottom skins.
   */
  tiltAreaMm2?: number[];
  /** area-weighted mean normal-Z of each tilt bin (exactly ±1 for flat faces) */
  tiltNz?: number[];
}

/** number of tilt bins in `GeometryStats.tiltAreaMm2` */
const TILT_BINS = 32;

export interface EstimateSettings {
  materialId: string;
  /** infill density, fraction 0..1 */
  infill: number;
  /** number of pieces */
  quantity: number;
  qualityId?: string;
  /** number of perimeters/walls */
  wallCount?: number;
}

export type EstimateWarning = 'not_watertight' | 'exceeds_bed' | 'tiny';

export interface Estimate {
  size: { x: number; y: number; z: number };
  volumeCm3: number;
  /** printed-plastic volume actually extruded per piece (cm³), after shell+infill */
  printedVolumeCm3: number;

  // ---- per piece ----
  weightG: number;
  filamentM: number;
  /** printing time of one piece, WITHOUT the per-plate prepare time */
  timeHours: number;
  /** order total ÷ quantity (so it always multiplies back to the total) */
  pricePerPiece: number;

  // ---- whole order ----
  quantity: number;
  /** how many copies fit on one plate in the uploaded orientation */
  piecesPerPlate: number;
  /** number of plates (separate print jobs) the order needs */
  plates: number;
  totalWeightG: number;
  /** all pieces + prepare time of every plate */
  totalTimeHours: number;
  /** material part of the price, before rounding / minimum */
  materialPrice: number;
  /** printer-time part of the price, before rounding / minimum */
  machinePrice: number;
  /** what the customer is shown: rounded, and never below the order minimum */
  totalPrice: number;
  /** true when the per-order minimum price was applied */
  minApplied: boolean;

  currency: string;
  material: Material;
  warnings: EstimateWarning[];
}

export interface Estimator {
  estimate(stats: GeometryStats, settings: EstimateSettings): Estimate;
}

/* ------------------------------------------------------------------------- */
/*  Geometry: volume (signed tetrahedra), area, bounding box                  */
/* ------------------------------------------------------------------------- */

/**
 * Compute volume, surface area and bounding box from raw triangle data.
 *
 * Volume uses the signed-tetrahedron method: for each triangle (a,b,c) the
 * signed volume of the tetrahedron it forms with the origin is a·(b×c)/6;
 * summed over a closed mesh, outward faces add and inward faces subtract, so
 * only the enclosed volume remains. Works on indexed and non-indexed buffers.
 *
 * @param position flat XYZ array (length = 3 * vertexCount)
 * @param index    optional triangle index array; if omitted, vertices are
 *                 taken three-at-a-time
 */
export function computeGeometryStats(
  position: ArrayLike<number>,
  index?: ArrayLike<number> | null,
): GeometryStats {
  let signed6 = 0; // 6× signed volume (divide once at the end)
  let area2 = 0; // 2× area (divide once at the end)

  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

  const tiltArea = new Array<number>(TILT_BINS).fill(0);
  const tiltNzSum = new Array<number>(TILT_BINS).fill(0);

  const triCount = index ? (index.length / 3) | 0 : (position.length / 9) | 0;

  for (let t = 0; t < triCount; t++) {
    let ia: number, ib: number, ic: number;
    if (index) {
      ia = index[t * 3] * 3;
      ib = index[t * 3 + 1] * 3;
      ic = index[t * 3 + 2] * 3;
    } else {
      ia = t * 9;
      ib = t * 9 + 3;
      ic = t * 9 + 6;
    }

    const ax = position[ia],     ay = position[ia + 1], az = position[ia + 2];
    const bx = position[ib],     by = position[ib + 1], bz = position[ib + 2];
    const cx = position[ic],     cy = position[ic + 1], cz = position[ic + 2];

    // signed volume contribution: a · (b × c)
    const crossX = by * cz - bz * cy;
    const crossY = bz * cx - bx * cz;
    const crossZ = bx * cy - by * cx;
    signed6 += ax * crossX + ay * crossY + az * crossZ;

    // area contribution: |(b - a) × (c - a)|
    const e1x = bx - ax, e1y = by - ay, e1z = bz - az;
    const e2x = cx - ax, e2y = cy - ay, e2z = cz - az;
    const nx = e1y * e2z - e1z * e2y;
    const ny = e1z * e2x - e1x * e2z;
    const nz = e1x * e2y - e1y * e2x;
    const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
    area2 += len;
    if (len > 0) {
      const unitNz = nz / len;
      const bin = Math.min(TILT_BINS - 1, Math.floor(((unitNz + 1) / 2) * TILT_BINS));
      tiltArea[bin] += len / 2;
      tiltNzSum[bin] += (len / 2) * unitNz;
    }

    if (ax < minX) minX = ax; if (ax > maxX) maxX = ax;
    if (ay < minY) minY = ay; if (ay > maxY) maxY = ay;
    if (az < minZ) minZ = az; if (az > maxZ) maxZ = az;
    if (bx < minX) minX = bx; if (bx > maxX) maxX = bx;
    if (by < minY) minY = by; if (by > maxY) maxY = by;
    if (bz < minZ) minZ = bz; if (bz > maxZ) maxZ = bz;
    if (cx < minX) minX = cx; if (cx > maxX) maxX = cx;
    if (cy < minY) minY = cy; if (cy > maxY) maxY = cy;
    if (cz < minZ) minZ = cz; if (cz > maxZ) maxZ = cz;
  }

  const signedVolumeMm3 = signed6 / 6;

  const size = triCount > 0
    ? { x: maxX - minX, y: maxY - minY, z: maxZ - minZ }
    : { x: 0, y: 0, z: 0 };

  return {
    volumeMm3: Math.abs(signedVolumeMm3),
    signedVolumeMm3,
    areaMm2: area2 / 2,
    size,
    triangles: triCount,
    tiltAreaMm2: tiltArea,
    tiltNz: tiltArea.map((a, i) => (a > 0 ? tiltNzSum[i] / a : 0)),
  };
}

/* ------------------------------------------------------------------------- */
/*  Heuristic estimator                                                       */
/* ------------------------------------------------------------------------- */

const MM3_PER_CM3 = 1000;

function roundMoney(value: number): number {
  const step = PRICING.roundToNearest || 1;
  return Math.round(value / step) * step;
}

/** Does the part fit the bed in *some* orientation? (compare sorted extents) */
function fitsBed(size: { x: number; y: number; z: number }): boolean {
  const part = [size.x, size.y, size.z].sort((a, b) => b - a);
  const bed = [PRINTER.bedX, PRINTER.bedY, PRINTER.bedZ].sort((a, b) => b - a);
  return part[0] <= bed[0] && part[1] <= bed[1] && part[2] <= bed[2];
}

/**
 * How many copies fit on one plate, standing as uploaded (Z up), in a simple
 * grid with the slicer's spacing. Always at least 1, so an oversized part
 * still gets a (per-piece) estimate next to its "exceeds bed" warning.
 */
export function piecesPerPlate(size: { x: number; y: number }): number {
  const usableX = PRINTER.bedX - 2 * PRINTER.bedMarginMm;
  const usableY = PRINTER.bedY - 2 * PRINTER.bedMarginMm;
  const gap = PRINTER.partSpacingMm;
  const grid = (w: number, d: number) =>
    w > 0 && d > 0
      ? Math.floor((usableX + gap) / (w + gap)) * Math.floor((usableY + gap) / (d + gap))
      : 0;
  return Math.max(1, grid(size.x, size.y), grid(size.y, size.x));
}

/**
 * Phase-A estimator. Turns solid volume into printed-plastic volume via a
 * shell + infill model, then derives weight, time and price.
 *
 * The price is MATERIAL + PRINTER TIME only (see materials.ts).
 */
export class HeuristicEstimator implements Estimator {
  estimate(stats: GeometryStats, settings: EstimateSettings): Estimate {
    const material = getMaterial(settings.materialId);
    const quality = getQuality(settings.qualityId ?? '');
    const infill = clamp(settings.infill, 0, 1);
    const quantity = Math.max(1, Math.floor(settings.quantity || 1));
    const wallCount = settings.wallCount ?? GEOMETRY.defaultWallCount;

    const solidMm3 = stats.volumeMm3;

    const layerHeight = quality.layerHeightMm;

    // ---- plastic per piece ------------------------------------------------
    // The shell is the solid skin a slicer puts under every surface: `wallCount`
    // perimeters behind steep faces, a few solid layers behind flat ones.
    // Each face gets whichever of the two is thicker along its normal.
    const wallThickness = wallCount * GEOMETRY.lineWidthMm;
    const topThickness = Math.max(GEOMETRY.topLayers * layerHeight, GEOMETRY.topMinThicknessMm);
    const bottomThickness = GEOMETRY.bottomLayers * layerHeight;
    let wallMm3 = 0;
    let skinMm3 = 0;
    if (stats.tiltAreaMm2 && stats.tiltNz) {
      for (let i = 0; i < stats.tiltAreaMm2.length; i++) {
        const area = stats.tiltAreaMm2[i];
        if (area <= 0) continue;
        const nz = stats.tiltNz[i];
        const asWall = wallThickness * Math.sqrt(Math.max(0, 1 - nz * nz));
        const asSkin = (nz > 0 ? topThickness : bottomThickness) * Math.abs(nz);
        if (asWall >= asSkin) wallMm3 += area * asWall;
        else skinMm3 += area * asSkin;
      }
    } else {
      // no orientation info: treat every face as a side wall
      wallMm3 = stats.areaMm2 * wallThickness;
    }
    const shellMm3 = Math.min(wallMm3 + skinMm3, solidMm3);
    const interiorMm3 = solidMm3 - shellMm3;

    // Thin upright features print solid: once the perimeters take up most of
    // the room between the skins, the pockets left over are too narrow for
    // sparse infill and the slicer fills them solid, whatever the infill
    // setting says. (A flat plate is NOT thin in this sense — the space
    // between its top and bottom skin is wide, so it keeps its sparse infill.)
    const roomForWalls = solidMm3 - Math.min(skinMm3, solidMm3);
    const wallRatio = roomForWalls > 0 ? wallMm3 / roomForWalls : 1;
    const solidify = clamp(
      (wallRatio - GEOMETRY.thinWallSolidFrom) / (1 - GEOMETRY.thinWallSolidFrom),
      0,
      1,
    );
    const effectiveInfill = infill + (1 - infill) * solidify;
    const printedMm3 =
      (shellMm3 + interiorMm3 * effectiveInfill) * PRICING.volumeCalibration;

    const printedCm3 = printedMm3 / MM3_PER_CM3;
    const weightG = printedCm3 * material.density;

    // filament length (m)
    const r = PRICING.filamentDiameterMm / 2;
    const filamentCrossSectionMm2 = Math.PI * r * r;
    const filamentM = filamentCrossSectionMm2 > 0
      ? printedMm3 / filamentCrossSectionMm2 / 1000
      : 0;

    // ---- time -------------------------------------------------------------
    // per piece: deposition (plastic ÷ volumetric flow; finer layers = less
    // flow = longer) + a per-layer overhead, so tall or detailed parts cost
    // more time than their volume alone implies.
    // per plate: one fixed prepare time, however many pieces share the plate.
    const flowMm3PerSec = PRICING.printSpeedMmS * GEOMETRY.lineWidthMm * layerHeight;
    const depositionSec = flowMm3PerSec > 0 ? printedMm3 / flowMm3PerSec : 0;
    const layers = Math.max(1, Math.ceil(stats.size.z / layerHeight));
    const pieceSec = depositionSec + layers * PRICING.perLayerOverheadSec;

    const perPlate = piecesPerPlate(stats.size);
    const plates = Math.ceil(quantity / perPlate);
    const totalSec = quantity * pieceSec + plates * PRICING.platePrepareMin * 60;

    const timeHours = pieceSec / 3600;
    const totalTimeHours = totalSec / 3600;
    const totalWeightG = weightG * quantity;

    // ---- price: material + printer time, for the whole order ---------------
    // Rounding happens ONCE, on the order total. (Rounding the unit price and
    // then multiplying turned 11 Kč into 10 Kč × 40 and lost 10 % of the order.)
    const materialPrice = totalWeightG * pricePerGram(material);
    const machinePrice = totalTimeHours * PRICING.machineRatePerHour;
    const rounded = roundMoney(materialPrice + machinePrice);
    const minApplied = rounded < PRICING.minOrderPrice;
    const totalPrice = minApplied ? PRICING.minOrderPrice : rounded;

    // warnings
    const warnings: EstimateWarning[] = [];
    const bboxMm3 = stats.size.x * stats.size.y * stats.size.z;
    const looksClosed =
      stats.triangles > 0 &&
      solidMm3 > bboxMm3 * 1e-4 &&
      solidMm3 <= bboxMm3 * 1.02;
    if (!looksClosed) warnings.push('not_watertight');
    if (!fitsBed(stats.size)) warnings.push('exceeds_bed');
    if (solidMm3 > 0 && solidMm3 < 1) warnings.push('tiny');

    return {
      size: stats.size,
      volumeCm3: solidMm3 / MM3_PER_CM3,
      printedVolumeCm3: printedCm3,
      weightG,
      filamentM,
      timeHours,
      pricePerPiece: totalPrice / quantity,
      quantity,
      piecesPerPlate: perPlate,
      plates,
      totalWeightG,
      totalTimeHours,
      materialPrice,
      machinePrice,
      totalPrice,
      minApplied,
      currency: PRICING.currency,
      material,
      warnings,
    };
  }
}

/** Shared singleton — swap for a SlicerEstimator in Phase B. */
export const estimator: Estimator = new HeuristicEstimator();

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}
