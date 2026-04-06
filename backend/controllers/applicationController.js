import Application from "../models/Application.js";
import Drive from "../models/Drive.js";

// Apply for a drive
export const applyForDrive = async (req, res) => {
  try {
    const { driveId, driveTitle, studentId, studentData } = req.body;

    // Check if student already applied
    const existingApplication = await Application.findOne({ driveId, studentId });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this drive"
      });
    }

    const newApplication = new Application({
      driveId,
      driveTitle,
      studentId,
      studentData,
      status: "applied"
    });

    await newApplication.save();

    // Increment application count in drive
    await Drive.findByIdAndUpdate(driveId, { $inc: { applicationCount: 1 } });

    res.status(201).json({
      success: true,
      message: `Successfully applied for ${driveTitle}!`,
      data: newApplication
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get applications for a specific drive (Admin only)
export const getApplicationsByDrive = async (req, res) => {
  try {
    const applications = await Application.find({ driveId: req.params.driveId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all applications (Admin only)
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("driveId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get student's applications
export const getStudentApplications = async (req, res) => {
  try {
    const { studentId } = req.params;
    const applications = await Application.find({ studentId }).populate("driveId").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
