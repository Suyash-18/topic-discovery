import { runPythonAnalysis } from "../utils/pythonRunner.js";
import fs from "fs";
import path from "path";

export const analyzeText = async (req, res) => {
  // Keep a reference to the file object to access it in the finally block
  const file = req.file;

  try {
    const { text, n_clusters } = req.body;

    if (!text && !file) {
      return res.status(400).json({ error: "Please provide text or upload a file." });
    }

    // Prepare input for Python
    const input = {};
    if (text) input.text = text;
    // Give the Python script an absolute path to the uploaded file
    if (file) input.file = path.resolve(file.path);
    if (n_clusters) input.n_clusters = n_clusters;

    // Call Python script
    const result = await runPythonAnalysis(input);

    return res.status(200).json(result); // Directly return the result from Python

  } catch (err) {
    console.error("❌ Error in analysis controller:", err);
    // Send back the raw error message from the Python script if available
    return res.status(500).json({ success: false, error: err.message || err });
  } finally {
    // 🗑️ Cleanup: Delete the temporary file from the 'uploads/' folder
    if (file) {
      fs.unlink(file.path, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Failed to delete temporary file:", unlinkErr);
        }
      });
    }
  }
};