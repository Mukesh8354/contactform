import nodemailer from "nodemailer";

export const sendContactMail = async (name, email, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
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
    console.error("Email error:", error.message);
    console.log("Full error:", error);
    return false;
  }
};
