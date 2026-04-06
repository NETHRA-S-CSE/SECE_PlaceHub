import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    driveId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drive",
      required: [true, "Drive ID is required"]
    },
    driveTitle: {
      type: String,
      required: true
    },
    studentId: {
      type: String,
      required: [true, "Student ID is required"]
    },
    studentData: {
      registerNumber: String,
      rollNumber: String,
      year: String,
      department: String,
      cgpa: Number,
      resumeLink: String
    },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected", "selected"],
      default: "applied"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
