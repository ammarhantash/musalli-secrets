// Server-side pricing — the source of truth for commission totals.
// Keep multipliers in sync with src/state/config-store.js (client preview only).
export const METAL_MULTIPLIERS = { gold: 1.0, platinum: 1.3 };
export const GEM_MULTIPLIERS   = { diamond: 1.0, ruby: 0.8, emerald: 0.65 };
export const CARAT_MIN = 0.5;
export const CARAT_MAX = 5.0;

export function computeTotal(pieces, metal, gem, carat) {
  const base = pieces.reduce((sum, p) => sum + p.base_price_sar, 0);
  return Math.round(base * carat * METAL_MULTIPLIERS[metal] * GEM_MULTIPLIERS[gem]);
}
