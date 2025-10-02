const smsService = async (phone, message) => {
  try {
    console.log(`📱 SMS to ${phone}: ${message}`);
    // Example: use Twilio / other service here
  } catch (err) {
    console.error("SMS error:", err);
  }
};

export default smsService;
