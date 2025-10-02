import express from "express";
import { getReminders, sendReminders } from "../controllers/reminderController.js";
import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

// Get upcoming reminders
router.get("/", protect, getReminders);

// Trigger sending reminders (email + SMS)
router.post("/send", protect, sendReminders);

export default router;
