import express from "express";
import { getSchedule, updateSchedule } from "../controllers/scheduleControllers.js";

const router = express.Router();

router.get("/:className", getSchedule);
router.put("/:className", updateSchedule);  // ✅ Ensures className is in URL

export default router;
