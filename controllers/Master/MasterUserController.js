import argon2 from "argon2";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../../models/Master/User.js";
import Token from "../../models/Master/Token.js";
import verifyEmail from "../../utils/verifyEmail.js";
import generateAccessToken from "../../utils/generateAccessToken.js";
import generateRefreshToken from "../../utils/generateRefreshToken.js";

dotenv.config();
export const registerUser = async (req, res) => {
  try {
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

    return res.status(201).json({
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
    return res.status(500).json({
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
          email_verified_at: new Date(),
        },
      },
      { new: true }
    );
    await Token.findOneAndUpdate(
      { email_verification_code: req.params.token },
      { $set: { email_verification_code: null } },
      { new: true }
    );

    return res.status(200).json({
      msg: "Email berhasil diverifikasi",
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log(`emailConfirm() Error: ${error.message}`);
    return res.status(500).json({
      msg: "Gagal memverfikasi email",
      success: false,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, rememberMe } = req.body;
  try {
    const user = await User.findOne({ email });
    const payload = {
      user: { email },
    };
    const refreshToken = await generateRefreshToken(payload, rememberMe);
    const refreshTokenFromDB = await Token.findOne({ id_user: user._id });
    if (!refreshTokenFromDB) {
      await new Token({
        id_user: user._id,
        refresh_token: refreshToken,
      }).save();
    } else {
      await Token.findOneAndUpdate(
        { id_user: user._id },
        { $set: { refresh_token: refreshToken } },
        { new: true }
      );
    }
    const optionRefreshTokenCookie = {
      httpOnly: true,
      maxAge:
        !rememberMe || rememberMe === false
          ? 3 * 24 * 60 * 60 * 1000
          : 7 * 24 * 60 * 60 * 1000,
    };
    res.cookie("refreshToken", refreshToken, optionRefreshTokenCookie);

    const accessToken = await generateAccessToken(payload, rememberMe);
    const optionAccessTokenCookie = {
      httpOnly: false,
      maxAge:
        !rememberMe || rememberMe === false
          ? 3 * 24 * 60 * 60 * 1000
          : 7 * 24 * 60 * 60 * 1000,
    };
    res.cookie("accessToken", accessToken, optionAccessTokenCookie);
    return res.status(200).json({
      msg: "Berhasil login!",
      success: true,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(`loginUser() Error: ${error.message}`);
    return res.status(500).json({
      msg: "Gagal login, terdapat kesalahan disisi server!",
      success: false,
    });
  }
};

export const logoutUser = async (req, res) => {
  // Jangan lupa menghapus token sisi klien (misalnya menghapusnya dari penyimpanan context, lokal, atau cookie).

  const user = req.user;

  try {
    const userFromDB = await User.findOne({ email: user.email });
    await Token.findOneAndUpdate(
      { id_user: userFromDB._id },
      { $set: { refresh_token: null } },
      { new: true }
    );
    if (req.cookies.refreshToken) {
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
    } else {
      res.clearCookie("accessToken");
    }
    return res.status(200).json({ msg: "Berhasil logout!", success: true });
  } catch (error) {
    console.log(`logoutUser() Error: ${error.message}`);
    return res.status(500).json({
      msg: "Gagal logout, terdapat kesalahan disisi server!",
      success: false,
    });
  }
};
