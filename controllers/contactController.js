import Contact from "../models/contactModel.js";
import { sendContactMail } from "../utils/sendMail.js";

export const sendContact = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);
    const { name, email, message } = req.body;

    // Save to DB
    const contact = await Contact.create({ name, email, message });
    console.log("Saved contact:", contact);
    // Send Email
    const mailSent = await sendContactMail(name, email, message);
    console.log("Mail sent status:", mailSent);
    if (!mailSent) {
      // return res.json({ success: false, message: "Email sending failed" });
      return res
        .status(500)
        .json({ success: false, message: "Email sending failed" });
    }

    return res.json({
      success: true,
      message: "Message saved & email sent",
      data: contact,
    });
  } catch (error) {
    console.error(error);
    // return res.json({ success: false, message: "Server error" });
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
