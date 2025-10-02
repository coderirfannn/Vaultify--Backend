import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    itemName: { type: String, required: true },
    purchaseDate: { type: Date, required: true },
    warrantyExpiry: { type: Date, required: true },
    billFile: { type: String }, // file URL
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);
export default Bill;
