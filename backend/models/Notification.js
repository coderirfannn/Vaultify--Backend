import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    billId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bill",
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["email", "sms"],
      default: "email",
    },
    status: {
      type: String,
      enum: ["pending", "sent"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
