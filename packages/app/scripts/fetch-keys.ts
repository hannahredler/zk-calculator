import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const circuitsDir = path.join(__dirname, "../../circuits/");
const publicDir = path.join(__dirname, "../public/");

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy circuit files
const filesToCopy = [
  ["build/Addition_js/Addition.wasm", "Addition.wasm"],
  ["zkkeys/Addition_final.zkey", "Addition_final.zkey"],
  ["zkkeys/Addition_final.zkey.json", "Addition_final.zkey.json"],
];

filesToCopy.forEach((file) => {
  const sourcePath = path.join(circuitsDir, file[0]);
  const destPath = path.join(publicDir, file[1]);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${file[0]} to public directory`);
  } else {
    console.warn(`Warning: ${file[0]} not found in circuits directory`);
  }
});
