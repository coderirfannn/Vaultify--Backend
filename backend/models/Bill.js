import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
    },
    warrantyPeriod: {
      type: Number, // in months
      required: [true, "Warranty period is required"],
    },
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);
export default Bill;
