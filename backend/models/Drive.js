import mongoose from "mongoose";

const driveSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Drive title is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    registrationLink: {
      type: String,
      required: [true, "Registration link is required"]
    },
    deadline: {
      type: Date,
      required: [true, "Deadline is required"]
    },
    eligibleYears: {
      type: [String],
      required: [true, "Eligible years are required"]
    },
    eligibleDepartments: {
      type: [String],
      required: [true, "Eligible departments are required"]
    },
    minCGPA: {
      type: Number,
      required: [true, "Minimum CGPA is required"]
    },
    type: {
      type: String,
      enum: ["placement", "internship"],
      default: "placement"
    },
    applicationCount: {
      type: Number,
      default: 0
    },
    postedBy: {
      type: String,
      default: "Admin"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Drive", driveSchema);
