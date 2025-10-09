import { runPython } from "../utils/pythonRunner.js";

export const processDocs = async (req, res) => {
  try {
    const result = await runPython();
    res.json(result);
  } catch (err) {
    console.error("Python error:", err);
    res.status(500).json({ error: err });
  }
};
