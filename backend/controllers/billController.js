import Bill from "../models/Bill.js";

// @desc   Upload Bill
// @route  POST /api/bills/upload
// @access Private
export const uploadBill = async (req, res) => {
  try {
    const { warrantyPeriod, expiryDate, notes } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const bill = await Bill.create({
      userId: req.user._id,
      fileUrl: `/uploads/${req.file.filename}`,
      warrantyPeriod,
      expiryDate,
      notes,
    });

    res.status(201).json(bill);
  } catch (error) {
    console.error("Upload Bill Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get User Bills
// @route  GET /api/bills/my-bills
// @access Private
export const getMyBills = async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(bills);
  } catch (error) {
    console.error("Get Bills Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Delete Bill
// @route  DELETE /api/bills/:id
// @access Private
export const deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    if (bill.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await bill.deleteOne();
    res.json({ message: "Bill deleted successfully" });
  } catch (error) {
    console.error("Delete Bill Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
