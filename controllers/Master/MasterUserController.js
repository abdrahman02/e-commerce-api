import argon2 from "argon2";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../../models/User.js";
import Token from "../../models/Token.js";
import verifyEmail from "../../utils/verifyEmail.js";

export const registerUser = async (req, res) => {
  try {
    dotenv.config();
    const { name, username, email, password, phone } = req.body;
    const hashedPassword = await argon2.hash(password);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      phone,
    });
    await newUser.save();

    const token = new Token({
      id_user: newUser._id,
      email_verification_code: crypto.randomBytes(16).toString("hex"),
    });
    await token.save();

    const link = `${process.env.APP_BASE_URL}/email-confirm/${token.email_verification_code}`;
    const sendVerifyEmail = await verifyEmail(email, link);

    res.status(201).json({
      msg: ["Sukses, 1 Data berhasil ditambahkan!", sendVerifyEmail.msg],
      success: {
        user: true,
        email_verification_code: sendVerifyEmail.success,
      },
      data: newUser,
      token: token,
    });
  } catch (error) {
    console.log(`registerUser() Error: ${error.message}`);
    res.status(500).json({
      msg: ["Gagal menambahkan data!", sendVerifyEmail.msg],
      success: {
        user: false,
        email_verification_code: sendVerifyEmail.success,
      },
    });
  }
};

export const emailConfirm = async (req, res) => {
  try {
    const token = await Token.findOne({
      email_verification_code: req.params.token,
    });
    const newUser = await User.findOneAndUpdate(
      { _id: token.id_user },
      {
        $set: {
          email_verified_at: new Date()
        },
      },
      { new: true }
    );
    const tes1 = await User.findById(token.id_user);
    console.log("email_verified_at", tes1.email_verified_at);
    await Token.findByIdAndDelete(token._id);

    res.status(200).json({
      msg: "Email berhasil diverifikasi",
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log(`emailConfirm() Error: ${error.message}`);
    res.status(500).json({
      msg: "Gagal memverfikasi email",
      success: false,
    });
  }
};

export const loginUser = (req, res) => {
  // Logika untuk login user
};
