import Contact from "../models/contactModel.js";
import { sendContactMail } from "../utils/sendMail.js";

export const sendContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to DB
    const contact = await Contact.create({ name, email, message });

    // Send Email
    const mailSent = await sendContactMail(name, email, message);

    if (!mailSent) {
      return res.json({ success: false, message: "Email sending failed" });
    }

    return res.json({
      success: true,
      message: "Message saved & email sent",
      data: contact,
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Server error" });
  }
};
