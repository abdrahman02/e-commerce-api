import nodemailer from "nodemailer";
import dotenv from "dotenv";

const verifyEmail = async (email, link) => {
  dotenv.config();
  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL_TRANSPORTER_EMAIL,
        pass: process.env.MAIL_TRANSPORTER_APP_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      text: "Welcome",
      html: `<div><a href="${link}" target="_blank">Klik here to verify your email</a></div>`,
    });
    console.log(`Kode berhasil dikirim kepada ${email}`);
    return {
      msg: "Kode verifikasi email berhasil dikirim!",
      success: true,
      Penerima: email,
    };
  } catch (error) {
    console.log(`verifyEmail() Error: ${error.message}`);
    return { msg: "Gagal mengirim kode!", success: false, Penerima: email };
  }
};

export default verifyEmail;
