import Drive from "../models/Drive.js";

// Get all drives
export const getAllDrives = async (req, res) => {
  try {
    const drives = await Drive.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: drives
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create new drive (Admin only)
export const createDrive = async (req, res) => {
  try {
    const { title, description, registrationLink, deadline, eligibleYears, eligibleDepartments, minCGPA } = req.body;

    // Validate required fields
    if (!title || !description || !registrationLink || !deadline || !eligibleYears || !eligibleDepartments || minCGPA === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    const newDrive = new Drive({
      title,
      description,
      registrationLink,
      deadline,
      eligibleYears,
      eligibleDepartments,
      minCGPA,
      type: "placement",
      postedBy: "Admin"
    });

    await newDrive.save();

    res.status(201).json({
      success: true,
      message: `Placement drive "${title}" posted successfully!`,
      data: newDrive
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single drive
export const getDriveById = async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    
    if (!drive) {
      return res.status(404).json({
        success: false,
        message: "Drive not found"
      });
    }

    res.status(200).json({
      success: true,
      data: drive
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update drive (Admin only)
export const updateDrive = async (req, res) => {
  try {
    const drive = await Drive.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!drive) {
      return res.status(404).json({
        success: false,
        message: "Drive not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Drive updated successfully",
      data: drive
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete drive (Admin only)
export const deleteDrive = async (req, res) => {
  try {
    const drive = await Drive.findByIdAndDelete(req.params.id);

    if (!drive) {
      return res.status(404).json({
        success: false,
        message: "Drive not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Drive deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
