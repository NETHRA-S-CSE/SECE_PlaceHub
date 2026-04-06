import express from "express";
import {
  applyForDrive,
  getApplicationsByDrive,
  getAllApplications,
  getStudentApplications
} from "../controllers/applicationController.js";

const router = express.Router();

// Student routes
router.post("/apply", applyForDrive);
router.get("/student/:studentId", getStudentApplications);

// Admin routes
router.get("/", getAllApplications);
router.get("/drive/:driveId", getApplicationsByDrive);

export default router;
