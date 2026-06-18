import { readFileSync, writeFileSync } from "node:fs";

const file = process.argv[2];

// Hex-form usages (gradients, inline-ish values). '#' is literal in regex; 'i' covers any case.
const hexMap = {
  "#1c1917": "var(--c-deep-navy)",
  "#f59e0b": "var(--c-terracotta)",
  "#14b8a6": "var(--c-emerald)",
  "#0d9488": "var(--c-emerald-deep)",
  "#faf7f2": "var(--c-champagne)",
  "#292524": "var(--c-navy-700)",
  "#44403c": "var(--c-navy-600)",
  "#57534c": "var(--c-navy-500)",
  "#57534e": "var(--c-navy-500)",
};

// Space-separated rgb() triples — Tailwind emits `rgb(R G B / var(--tw-*-opacity))`.
// Replacing the bare triple with `var(--c-*-rgb)` keeps the alpha channel intact.
const rgbMap = {
  "250 247 242": "var(--c-champagne-rgb)",
  "28 25 23": "var(--c-deep-navy-rgb)",
  "245 158 11": "var(--c-terracotta-rgb)",
  "20 184 166": "var(--c-emerald-rgb)",
  "13 148 136": "var(--c-emerald-deep-rgb)",
  "41 37 36": "var(--c-navy-700-rgb)",
  "68 64 60": "var(--c-navy-600-rgb)",
  "87 83 76": "var(--c-navy-500-rgb)",
  "87 83 78": "var(--c-navy-500-rgb)",
};

let css = readFileSync(file, "utf8");
let hexTotal = 0;
let rgbTotal = 0;

// Swap hexes only in VALUE position. Tailwind arbitrary-value classes embed the
// hex in the SELECTOR too (escaped as `\#abc123`), and those must stay intact or
// the class stops matching. The negative lookbehind skips backslash-escaped hexes.
for (const [hex, v] of Object.entries(hexMap)) {
  const re = new RegExp("(?<!\\\\)" + hex, "gi");
  hexTotal += (css.match(re) || []).length;
  css = css.replace(re, v);
}

// Anchor each rgb triple to a preceding `rgb(` so unrelated number runs are never touched.
for (const [triple, v] of Object.entries(rgbMap)) {
  const re = new RegExp("rgb\\(" + triple.replace(/ /g, "\\s+"), "g");
  rgbTotal += (css.match(re) || []).length;
  css = css.replace(re, "rgb(" + v);
}

writeFileSync(file, css, "utf8");
console.log(`Swapped ${hexTotal} hex + ${rgbTotal} rgb() occurrences in ${file}.`);
