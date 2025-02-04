const fs = require("fs");
const path = require("path");

const circuitsDir = path.join(__dirname, "../../circuits/");
const publicDir = path.join(__dirname, "../public/");

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy circuit files
const filesToCopy = [
  "build/Addition_js/Addition.wasm",
  "zkkeys/Addition_final.zkey",
  "zkkeys/Addition_final.zkey.json",
];

filesToCopy.forEach((file) => {
  const sourcePath = path.join(circuitsDir, file);
  const destPath = path.join(publicDir, file);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${file} to public directory`);
  } else {
    console.warn(`Warning: ${file} not found in circuits directory`);
  }
});
