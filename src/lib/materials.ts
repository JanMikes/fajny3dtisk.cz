/**
 * materials.ts — SINGLE SOURCE OF TRUTH for the price calculator.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  MICHAL: tune the numbers in this file to match your real pricing.        │
 * │                                                                           │
 * │  • `density` values are physically correct — leave them alone.            │
 * │  • `pricePerGram` is YOUR CUSTOMER PRICE per gram of printed plastic,      │
 * │    in CZK/g (it already includes your markup).                            │
 * │  • `machineRatePerHour` is your charge for printer time, CZK/h.           │
 * │                                                                           │
 * │  Confirmed by Michal: PLA 1, PETG 1, ASA 2.3 CZK/g · 15 CZK/h ·           │
 * │  minimum order 250 CZK. TPU / ABS / PC below are PLACEHOLDERS.            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * The calculator only ever produces a ROUGH estimate (it does not slice the
 * model), so these knobs just need to get the ballpark right. Calibrate by
 * printing a couple of known parts in your slicer and comparing.
 */

export interface Material {
  /** stable id used in settings + the quote message */
  id: string;
  /** display name (material names are universal, not translated) */
  name: string;
  /** g/cm³ — physical filament density (do not change) */
  density: number;
  /** CZK per gram of printed plastic — your customer price (incl. markup) */
  pricePerGram: number;
}

/** The six materials offered, in display order. */
export const MATERIALS: Material[] = [
  { id: 'pla',  name: 'PLA',  density: 1.24, pricePerGram: 1.0 },   // confirmed
  { id: 'petg', name: 'PETG', density: 1.27, pricePerGram: 1.0 },   // confirmed
  { id: 'asa',  name: 'ASA',  density: 1.07, pricePerGram: 2.3 },   // confirmed
  { id: 'tpu',  name: 'TPU',  density: 1.21, pricePerGram: 2.5 },   // PLACEHOLDER — confirm
  { id: 'abs',  name: 'ABS',  density: 1.04, pricePerGram: 1.5 },   // PLACEHOLDER — confirm
  { id: 'pc',   name: 'PC',   density: 1.20, pricePerGram: 3.0 },   // PLACEHOLDER — confirm
];

export const DEFAULT_MATERIAL_ID = 'pla';

export function getMaterial(id: string): Material {
  return MATERIALS.find((m) => m.id === id) ?? MATERIALS[0];
}

/** Global pricing + machine knobs. All money values in CZK. */
export const PRICING = {
  /** currency symbol used in the UI */
  currency: 'Kč',
  /** printer-time charge, CZK per hour (confirmed: 15) */
  machineRatePerHour: 15,
  /** flat prep/slicing fee added to every job. 0 = off. */
  setupFee: 0,
  /** support removal / cleanup fee added to every job. 0 = off. */
  postProcessingFee: 0,
  /** extra margin on top, as a fraction (0 = off; per-gram price already
   *  includes your markup, so this defaults to 0) */
  margin: 0,
  /** minimum charge per piece, CZK (confirmed: 250) */
  minOrderPrice: 250,
  /** estimated price is rounded to the nearest multiple of this (keeps it
   *  visibly "approximate" rather than falsely precise) */
  roundToNearest: 5,

  // ---- print-time estimate (the rough part) ------------------------------
  /** effective average print head speed, mm/s. Volumetric flow is derived as
   *  speed × line width × layer height, so this folds in the perimeter/infill
   *  mix and travel. Lower = slower = longer time = pricier. */
  printSpeedMmS: 80,
  /** extra seconds per layer (Z moves, retractions, small features). Makes
   *  tall/thin parts cost more time than their volume alone implies. */
  perLayerOverheadSec: 2,
  /** fixed time added per print (heat-up, first layers, removal), minutes */
  fixedTimeOverheadMin: 8,

  /** filament diameter, mm (1.75 standard) */
  filamentDiameterMm: 1.75,
};

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
};

/** Build volume of the printer, mm (per the site FAQ: 180×180×180). */
export const PRINTER = {
  bedX: 180,
  bedY: 180,
  bedZ: 180,
};
