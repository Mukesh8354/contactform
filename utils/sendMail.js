/*export const sendContactMail = async (name, email, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log("Email error:", error);
    return false;
  }
};*/

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactMail = async (name, email, message) => {
  try {
    await resend.emails.send({
      from: email,
      to: process.env.EMAIL_USER, // your email
      subject: `New Contact Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    return true;
  } catch (error) {
    console.log("EMAIL ERROR:", error);
    return false;
  }
};
