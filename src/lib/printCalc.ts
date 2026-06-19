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
}

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
  /** printed-plastic volume actually extruded (cm³), after shell+infill */
  printedVolumeCm3: number;

  // ---- per piece ----
  weightG: number;
  filamentM: number;
  timeHours: number;
  pricePerPiece: number;

  // ---- totals ----
  quantity: number;
  totalPrice: number;
  /** true when the per-order minimum price was applied */
  minApplied: boolean;
  totalWeightG: number;
  totalTimeHours: number;

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
    area2 += Math.sqrt(nx * nx + ny * ny + nz * nz);

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
 * Phase-A estimator. Turns solid volume into printed-plastic volume via a
 * shell + infill model, then derives weight, time and price.
 */
export class HeuristicEstimator implements Estimator {
  estimate(stats: GeometryStats, settings: EstimateSettings): Estimate {
    const material = getMaterial(settings.materialId);
    const quality = getQuality(settings.qualityId ?? '');
    const infill = clamp(settings.infill, 0, 1);
    const quantity = Math.max(1, Math.floor(settings.quantity || 1));
    const wallCount = settings.wallCount ?? GEOMETRY.defaultWallCount;

    const solidMm3 = stats.volumeMm3;

    // shell ≈ outer surface area × wall thickness, capped at the solid volume
    const wallThickness = wallCount * GEOMETRY.lineWidthMm;
    const shellMm3 = Math.min(stats.areaMm2 * wallThickness, solidMm3);
    const interiorMm3 = Math.max(solidMm3 - shellMm3, 0);
    // calibration factor folds in real-world slicer behaviour (see materials.ts)
    const printedMm3 = (shellMm3 + interiorMm3 * infill) * PRICING.volumeCalibration;

    // weight
    const printedCm3 = printedMm3 / MM3_PER_CM3;
    const weightG = printedCm3 * material.density;

    // filament length (m)
    const r = PRICING.filamentDiameterMm / 2;
    const filamentCrossSectionMm2 = Math.PI * r * r;
    const filamentM = filamentCrossSectionMm2 > 0
      ? printedMm3 / filamentCrossSectionMm2 / 1000
      : 0;

    // print time (h): a layer-aware heuristic — still only an ESTIMATE.
    //   deposition time = plastic volume ÷ volumetric flow, where
    //   flow = print speed × line width × layer height (so finer layers, i.e.
    //   a smaller layer height, correctly take longer); plus a per-layer
    //   overhead (Z moves, retractions) so tall/thin parts cost more time than
    //   their volume alone implies.
    const layerHeight = quality.layerHeightMm;
    const flowMm3PerSec = PRICING.printSpeedMmS * GEOMETRY.lineWidthMm * layerHeight;
    const depositionSec = flowMm3PerSec > 0 ? printedMm3 / flowMm3PerSec : 0;
    const layers = Math.max(1, Math.ceil(stats.size.z / layerHeight));
    const layerOverheadSec = layers * PRICING.perLayerOverheadSec;
    const timeHours =
      ((depositionSec + layerOverheadSec + PRICING.fixedTimeOverheadMin * 60) / 3600) *
      PRICING.timeCalibration;

    // price build-up — pricePerGram is the customer charge per gram (CZK/g)
    const materialCost = weightG * material.pricePerGram;
    const machineCost = timeHours * PRICING.machineRatePerHour;
    const subtotal =
      materialCost + machineCost + PRICING.setupFee + PRICING.postProcessingFee;
    // unit price is the true per-piece cost; the minimum applies to the ORDER
    const pricePerPiece = roundMoney(subtotal * (1 + PRICING.margin));
    const rawTotal = pricePerPiece * quantity;
    const minApplied = rawTotal < PRICING.minOrderPrice;
    const totalPrice = minApplied ? PRICING.minOrderPrice : rawTotal;

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
      pricePerPiece,
      quantity,
      totalPrice,
      minApplied,
      totalWeightG: weightG * quantity,
      totalTimeHours: timeHours * quantity,
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
