export function formatSAR(amount) {
  return Number(amount).toLocaleString('en-SA') + ' SAR';
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
