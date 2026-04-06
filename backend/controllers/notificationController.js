import Notification from "../models/Notification.js";

// Create notification (Admin only)
export const createNotification = async (req, res) => {
  try {
    const { driveId, driveTitle, message } = req.body;

    if (!driveId || !driveTitle || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide drive ID, title, and message"
      });
    }

    const newNotification = new Notification({
      driveId,
      driveTitle,
      message,
      postedBy: "Admin"
    });

    await newNotification.save();

    res.status(201).json({
      success: true,
      message: `Notification posted successfully!`,
      data: newNotification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate("driveId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get notifications for a specific drive
export const getNotificationsByDrive = async (req, res) => {
  try {
    const notifications = await Notification.find({ driveId: req.params.driveId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete notification (Admin only)
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
