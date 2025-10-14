// backend/routes/mlRoutes.js
import express from "express";
import multer from "multer";
import { analyzeText } from "../controllers/mlController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/analyze", upload.single("file"), analyzeText);

export default router;
        