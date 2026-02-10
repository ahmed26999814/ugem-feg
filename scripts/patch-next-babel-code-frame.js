const fs = require("fs");
const path = require("path");

const target = path.join(
  __dirname,
  "..",
  "node_modules",
  "next",
  "dist",
  "compiled",
  "babel-code-frame",
  "index.js"
);

if (!fs.existsSync(target)) {
  console.warn(
    `[patch-next-babel-code-frame] Skipped: ${target} not found.`
  );
  process.exit(0);
}

const source = fs.readFileSync(target, "utf8");
const from = "const s=a[1]||1;";
const to = "const s=Math.max(0,a[1]||1);";

if (source.includes(to)) {
  console.log("[patch-next-babel-code-frame] Already patched.");
  process.exit(0);
}

if (!source.includes(from)) {
  console.warn("[patch-next-babel-code-frame] Pattern not found. Skipping.");
  process.exit(0);
}

const updated = source.replace(from, to);
fs.writeFileSync(target, updated, "utf8");
console.log("[patch-next-babel-code-frame] Patch applied.");
