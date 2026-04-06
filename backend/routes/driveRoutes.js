import express from "express";
import {
  getAllDrives,
  createDrive,
  getDriveById,
  updateDrive,
  deleteDrive
} from "../controllers/driveController.js";

const router = express.Router();

// Public routes
router.get("/", getAllDrives);
router.get("/:id", getDriveById);

// Admin routes
router.post("/", createDrive);
router.put("/:id", updateDrive);
router.delete("/:id", deleteDrive);

export default router;
