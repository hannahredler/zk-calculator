import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Update paths to be relative to the project root
const projectRoot = path.join(__dirname, "../../../");
const circuitsPath = path.join(projectRoot, "packages/circuits/build");
const publicDir = path.join(projectRoot, "packages/app/public/");

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
// Define circuits to process
const circuits = ["Addition", "Subtraction"];

// Copy circuit files for each circuit
circuits.forEach((circuit) => {
  const circuitDir = path.join(circuitsPath, circuit);
  const filesToCopy = [
    [`${circuit}_js/${circuit}.wasm`, `${circuit}.wasm`],
    [`zkkeys/${circuit}_final.zkey`, `${circuit}_final.zkey`],
    [`zkkeys/${circuit}_final.zkey.json`, `${circuit}_final.zkey.json`],
  ];

  filesToCopy.forEach((file) => {
    const sourcePath = path.join(circuitDir, file[0]);
    const destPath = path.join(publicDir, file[1]);

    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied ${file[0]} to public directory`);
    } else {
      console.warn(`Warning: ${file[0]} not found in circuits directory`);
    }
  });
});
