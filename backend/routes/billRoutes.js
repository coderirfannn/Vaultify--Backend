import express from "express";
import multer from "multer";
import {
  uploadBill,
  getMyBills,
  deleteBill,
} from "../controllers/billController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Multer storage setup (uploads folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// @route POST /api/bills/upload
router.post("/upload", protect, upload.single("bill"), uploadBill);

// @route GET /api/bills/my-bills
router.get("/my-bills", protect, getMyBills);

// @route DELETE /api/bills/:id
router.delete("/:id", protect, deleteBill);

export default router;
