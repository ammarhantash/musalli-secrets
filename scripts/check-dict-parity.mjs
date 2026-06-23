import en from "../src/i18n/dictionaries/en.ts";
import ar from "../src/i18n/dictionaries/ar.ts";

function keyPaths(obj, prefix = "") {
  if (Array.isArray(obj)) return [`${prefix}[]:${obj.length}`];
  if (obj && typeof obj === "object")
    return Object.keys(obj).sort().flatMap((k) => keyPaths(obj[k], `${prefix}.${k}`));
  return [prefix];
}

const a = keyPaths(en).join("\n");
const b = keyPaths(ar).join("\n");
if (a !== b) {
  console.error("Dictionary parity FAILED. en vs ar differ:");
  const as = new Set(a.split("\n")), bs = new Set(b.split("\n"));
  for (const x of as) if (!bs.has(x)) console.error("  only in en:", x);
  for (const x of bs) if (!as.has(x)) console.error("  only in ar:", x);
  process.exit(1);
}
console.log("Dictionary parity OK:", a.split("\n").length, "leaf paths.");
