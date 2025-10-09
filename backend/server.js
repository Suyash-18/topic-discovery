import express from "express";
import cors from "cors";
import mlRoutes from "./routes/mlRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", mlRoutes);

app.listen(5000, () => {
  console.log("✅ Backend running at http://localhost:5000");
});
