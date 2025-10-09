import { spawn } from "child_process";
import path from "path";

export const runPython = () => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(process.cwd(), "../ml/main.py");
    const py = spawn("python", [scriptPath]);

    let data = "";
    let errorData = "";

    py.stdout.on("data", chunk => {
      data += chunk.toString();
    });

    py.stderr.on("data", chunk => {
      errorData += chunk.toString();
    });

    py.on("close", () => {
      if (errorData) {
        return reject(errorData);
      }
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject("Failed to parse Python output");
      }
    });
  });
};
