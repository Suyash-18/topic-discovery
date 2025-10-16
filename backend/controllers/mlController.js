import { runPythonAnalysis } from "../utils/pythonRunner.js";
import fs from "fs";
import path from "path";

export const analyzeText = async (req, res) => {
  const file = req.file;

  try {
    const { text, n_clusters } = req.body;

    if (!text && !file) {
      return res.status(400).json({ error: "Please provide text or upload a file." });
    }

    const input = {};
    if (text) input.text = text;
    if (n_clusters) input.n_clusters = n_clusters;

    // --- 🔽 MODIFICATION START 🔽 ---
    // This section must be updated to send the correct keys
    if (file) {
      input.filePath = path.resolve(file.path); // The path to the temp file
      input.originalName = file.originalname;   // The original filename with its extension
    }
    // --- 🔼 MODIFICATION END 🔼 ---

    const result = await runPythonAnalysis(input);
    return res.status(200).json(result);

  } catch (err) {
    console.error("❌ Error in analysis controller:", err);
    return res.status(500).json({ success: false, error: err.message || err });
  } finally {
    if (file) {
      fs.unlink(file.path, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Failed to delete temporary file:", unlinkErr);
        }
      });
    }
  }
};