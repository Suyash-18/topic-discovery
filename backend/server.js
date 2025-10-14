// backend/server.js
import express from "express";
import cors from "cors";
import mlRoutes from "./routes/mlRoutes.js";
import path from "path"; // 👈 Add this
import { fileURLToPath } from "url"; // 👈 Add this

const __filename = fileURLToPath(import.meta.url); // 👈 Add this
const __dirname = path.dirname(__filename); // 👈 Add this

const app = express();
app.use(cors());
app.use(express.json());

// 🖼️ Serve the output images folder
const mlOutputDirectory = path.resolve(__dirname, "../ml/output");
app.use("/output", express.static(mlOutputDirectory));

app.use("/api", mlRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));