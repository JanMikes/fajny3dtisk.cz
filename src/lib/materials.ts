/**
 * materials.ts — SINGLE SOURCE OF TRUTH for the price calculator.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  MICHAL: tune the numbers in this file to match your real pricing.        │
 * │                                                                           │
 * │  • `density` values are physically correct — leave them alone.            │
 * │  • `costPerKg` is what YOU PAY for a kilogram of filament, in CZK.         │
 * │  • `materialMarkup` is added on top of that cost (0.40 = +40 %).          │
 * │  • `machineRatePerHour` is your charge for printer time, CZK/h.           │
 * │                                                                           │
 * │  Confirmed by Michal (2026-11): PLA 300, PETG 300, ASA 350 CZK/kg ·        │
 * │  markup 40–45 % · 52.50 CZK/h · 50 CZK per order · minimum 250 CZK.      │
 * │  TPU / ABS / PC costs below are PLACEHOLDERS.                             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * WHAT THE PRICE COVERS: material + printing. "Printing" is printer time at
 * `machineRatePerHour` plus one flat `orderFee` (cleaning the printer and the
 * routine work around a print). The fee is deliberately NOT itemised for the
 * customer: it is folded into the single "printing" figure.
 * Job-specific manual work (support removal, post-processing, model fixes,
 * design/modelling) is agreed individually and is NOT part of this
 * calculation — the UI says so. Do not add such fees here without changing
 * that wording too.
 *
 * The calculator only ever produces an estimate (it does not slice the model).
 * Calibrate by slicing known parts and comparing — see `PRICING` below.
 */

export interface Material {
  /** stable id used in settings + the quote message */
  id: string;
  /** display name (material names are universal, not translated) */
  name: string;
  /** g/cm³ — physical filament density (do not change) */
  density: number;
  /** CZK per kilogram of filament — your purchase cost (before markup) */
  costPerKg: number;
}

/** The six materials offered, in display order. */
export const MATERIALS: Material[] = [
  { id: 'pla',  name: 'PLA',  density: 1.24, costPerKg: 300 },   // confirmed
  { id: 'petg', name: 'PETG', density: 1.27, costPerKg: 300 },   // confirmed
  { id: 'asa',  name: 'ASA',  density: 1.07, costPerKg: 350 },   // confirmed
  { id: 'tpu',  name: 'TPU',  density: 1.21, costPerKg: 750 },   // PLACEHOLDER — confirm
  { id: 'abs',  name: 'ABS',  density: 1.04, costPerKg: 450 },   // PLACEHOLDER — confirm
  { id: 'pc',   name: 'PC',   density: 1.20, costPerKg: 900 },   // PLACEHOLDER — confirm
];

export const DEFAULT_MATERIAL_ID = 'pla';

export function getMaterial(id: string): Material {
  return MATERIALS.find((m) => m.id === id) ?? MATERIALS[0];
}

/** Global pricing + machine knobs. All money values in CZK. */
export const PRICING = {
  /** currency symbol used in the UI */
  currency: 'Kč',
  /** markup on the filament purchase cost, as a fraction (0.40 = cost × 1.40) */
  materialMarkup: 0.4,
  /** printer-time charge, CZK per hour. 25 covers running the printer; the
   *  rest is margin (set 2026-11-14, tuned so the 40-piece benchmark order
   *  comes to about 950 CZK). */
  machineRatePerHour: 52.5,
  /** flat fee per ORDER, CZK: cleaning the printer and the routine work around
   *  a print. Charged once, whatever the quantity; shown to the customer only
   *  as part of the printing price. */
  orderFee: 50,
  /** minimum charge per ORDER, CZK (confirmed: 250) */
  minOrderPrice: 250,
  /** the order total is rounded to the nearest multiple of this (keeps it
   *  visibly "approximate" rather than falsely precise) */
  roundToNearest: 5,

  /** filament diameter, mm (1.75 standard) */
  filamentDiameterMm: 1.75,

  // ---- calibration: tune these against real slicer results ----------------
  //
  // Benchmarks so far (0.2 mm layers, 15 % infill):
  //   A  2026-06  "Trychtýř" funnel, 1 pc, PETG ........ 186.4 g · 7 h 04 min
  //   B  2026-11  "2020-item" profile, 40 pcs on 1 plate  255.26 g · 14 h 59 min
  //               (22.3 min of printing per piece + 6 min 16 s prepare, once)
  //
  // Time is modelled as  pieces × (plastic ÷ flow + layers × perLayerOverhead)
  //                      + plates × platePrepare.
  // `printSpeedMmS` and `perLayerOverheadSec` are solved from A and B together
  // (two benchmarks, two unknowns) and reproduce both within 1 %. That is a
  // fit, not a validation — re-solve when a third benchmark arrives.

  /**
   * Fraction of the geometric shell+infill volume that actually gets extruded.
   * A part printed fully solid comes out at ~95 % of its mesh volume (rounded
   * extrusion ends, unfilled slivers): benchmark B is 94.7 %.
   * Raise if the calculator under-estimates weight, lower if it over-estimates.
   */
  volumeCalibration: 0.95,
  /** effective average head speed, mm/s. Volumetric flow is derived as
   *  speed × line width × layer height. Lower = slower = longer = pricier. */
  printSpeedMmS: 80,
  /** extra seconds per layer PER PIECE (seams, retractions, travel between
   *  parts, short accelerating moves). This is what makes small detailed parts
   *  slower per gram than big ones. */
  perLayerOverheadSec: 3.85,
  /** fixed time per PLATE, not per piece (heat-up, bed levelling) — the
   *  slicer's "Prepare time". 6 min 16 s on benchmark B. */
  platePrepareMin: 6.3,
};

/** Customer price of one gram of printed plastic: purchase cost + markup. */
export function pricePerGram(material: Material): number {
  return (material.costPerKg / 1000) * (1 + PRICING.materialMarkup);
}

/** Print-quality presets. Layer height drives both detail and time. */
export interface QualityPreset {
  id: string;
  layerHeightMm: number;
}

export const QUALITY_PRESETS: QualityPreset[] = [
  { id: 'draft',    layerHeightMm: 0.28 },
  { id: 'standard', layerHeightMm: 0.2 },
  { id: 'fine',     layerHeightMm: 0.12 },
];

export const DEFAULT_QUALITY_ID = 'standard';

export function getQuality(id: string): QualityPreset {
  return QUALITY_PRESETS.find((q) => q.id === id) ?? QUALITY_PRESETS[1];
}

/** Geometry defaults used to turn solid volume into printed-plastic volume. */
export const GEOMETRY = {
  /** extrusion line width, mm (≈ nozzle 0.4) */
  lineWidthMm: 0.42,
  /** default number of perimeters (walls) */
  defaultWallCount: 3,
  /** default infill density, fraction 0..1 */
  defaultInfill: 0.15,
  /** solid layers under every upward-facing surface (slicer default: 5) */
  topLayers: 5,
  /** …but never thinner than this, mm (matters for fine layers) */
  topMinThicknessMm: 1.0,
  /** solid layers above every downward-facing surface (slicer default: 3) */
  bottomLayers: 3,
  /**
   * Thin upright features print solid. Once the perimeters take up more than
   * this fraction of the room between the top/bottom skins, the pockets left
   * between them are too narrow for sparse infill and the slicer fills them
   * solid; the infill setting fades out linearly from here up to 1.0.
   */
  thinWallSolidFrom: 0.6,
};

/** Input limits the calculator UI clamps to. */
export const LIMITS = {
  /** above this the estimate stops being meaningful — bigger series are quoted by hand */
  maxQuantity: 500,
  minWallCount: 1,
  maxWallCount: 8,
};

/** Build volume of the printer, mm (per the site FAQ: 256×256×256). */
export const PRINTER = {
  bedX: 256,
  bedY: 256,
  bedZ: 256,
  /** unusable strip along each bed edge, mm */
  bedMarginMm: 3,
  /** gap the slicer keeps between copies when arranging a plate, mm */
  partSpacingMm: 6,
};
