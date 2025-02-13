import express from "express";
import { getSchedule, updateSchedule, createSchedule } from "../controllers/scheduleControllers.js";

const router = express.Router();

router.get("/:className", getSchedule);
router.put("/:className", updateSchedule);  
router.post("/", createSchedule);  // ✅ Added POST for new schedules

export default router;
