import express from "express";
import { processDocs } from "../controllers/mlController.js";

const router = express.Router();

router.get("/process", processDocs);

export default router;
