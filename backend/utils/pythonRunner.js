import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const runPythonAnalysis = (input) => {
  return new Promise((resolve, reject) => {
    // 🔹 Define path to the ml directory
    const mlDirectory = path.resolve(__dirname, "../../ml");
    const scriptPath = path.resolve(mlDirectory, "main.py");
    const logFile = path.resolve(mlDirectory, "log.txt");

    // ✅ Make sure ml directory exists
    if (!fs.existsSync(mlDirectory)) {
      // You likely have a bigger problem if the ml folder is missing
      return reject(`Error: Python directory not found at ${mlDirectory}`);
    }

    console.log("🧠 Running Python script at:", scriptPath);
    console.log("📂 Setting working directory to:", mlDirectory);

    // ✅ Spawn python3 and set the Current Working Directory (cwd)
    const py = spawn("python", [scriptPath], { cwd: mlDirectory });

    let data = "";
    let error = "";

    py.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    py.stderr.on("data", (chunk) => {
      error += chunk.toString();
    });

    py.on("close", (code) => {
      if (error) {
        // ✅ Always log stderr for debugging
        fs.appendFileSync(
          logFile,
          `\n[${new Date().toISOString()}] Exit Code: ${code}\n--- STDERR ---\n${error}\n--------------\n`
        );
      }

      if (code !== 0) {
        console.error("❌ Python Error:", error);
        reject(error || `Python process exited with code ${code}`);
      } else {
        try {
          // If data is empty but exit code is 0, it might be an issue.
          if (!data) {
             throw new Error("Python script returned empty output but exited successfully.");
          }
          resolve(JSON.parse(data));
        } catch (err) {
          const parseErrorMsg = `\n[${new Date().toISOString()}] JSON Parse Error: ${err.message}\n--- PYTHON STDOUT ---\n${data}\n---------------------\n`;
          fs.appendFileSync(logFile, parseErrorMsg);
          reject("Failed to parse Python output: " + err.message);
        }
      }
    });

    // Send input JSON to Python's stdin
    py.stdin.write(JSON.stringify(input));
    py.stdin.end();
  });
};