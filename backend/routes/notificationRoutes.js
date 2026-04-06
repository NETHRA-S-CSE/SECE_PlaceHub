import express from "express";
import {
  createNotification,
  getAllNotifications,
  getNotificationsByDrive,
  deleteNotification
} from "../controllers/notificationController.js";

const router = express.Router();

// Public routes
router.get("/", getAllNotifications);
router.get("/drive/:driveId", getNotificationsByDrive);

// Admin routes
router.post("/", createNotification);
router.delete("/:id", deleteNotification);

export default router;
