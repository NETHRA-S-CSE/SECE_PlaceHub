import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
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
    message: {
      type: String,
      required: [true, "Message is required"]
    },
    postedBy: {
      type: String,
      default: "Admin"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
