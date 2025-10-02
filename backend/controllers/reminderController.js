import Bill from "../models/Bill.js";
import sendEmail from "../utils/sendEmail.js";
import smsService from "../utils/smsService.js";

// Get upcoming reminders (e.g., expiring in next 7 days)
export const getReminders = async (req, res) => {
  try {
    const userId = req.user._id; // from authMiddleware
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const reminders = await Bill.find({
      user: userId,
      warrantyExpiry: { $gte: today, $lte: nextWeek },
    });

    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reminders", error: error.message });
  }
};

// Send reminder notifications
export const sendReminders = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const bills = await Bill.find({
      user: userId,
      warrantyExpiry: { $gte: today, $lte: nextWeek },
    }).populate("user", "email name");

    for (const bill of bills) {
      const msg = `Hi ${bill.user.name}, warranty for ${bill.itemName} expires on ${bill.warrantyExpiry.toDateString()}.`;

      // send email
      await sendEmail(bill.user.email, "Warranty Reminder", msg);

      // send SMS
      await smsService(bill.user.phone, msg);
    }

    res.json({ message: "Reminders sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send reminders", error: error.message });
  }
};
