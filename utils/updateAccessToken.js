import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../models/Master/Token.js";
import generateAccessToken from "./generateAccessToken.js";

dotenv.config();
export const updateAccessToken = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({
      msg: "Akses ditolak karena tidak memiliki token!, silahkan login kembali!",
    });
  }

  try {
    const refreshTokenFromDB = await Token.findOne({
      refresh_token: refreshToken,
    });
    if (!refreshTokenFromDB) {
      return res
        .status(401)
        .json({ message: "Token tidak valid", success: false });
    }
    const decoded = await jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_KEY_REF
    );

    const accessToken = await generateAccessToken(decoded.user);
    const optionAccessTokenCookie = {
      httpOnly: false,
      maxAge:
        !req.body.rememberMe || req.body.rememberMe === false
          ? 15 * 60 * 1000
          : 3 * 24 * 60 * 60 * 1000,
    };
    res.cookie("accessToken", accessToken, optionAccessTokenCookie);

    req.user = decoded.user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      await Token.findOneAndUpdate(
        { refresh_token: refreshToken },
        { $set: { refresh_token: null } },
        { new: true }
      );
      if (req.cookies.refreshToken) {
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
      } else {
        res.clearCookie("accessToken");
      }
      return res.status(401).json({
        msg: "Token telah expired, silahkan login kembali!",
        success: true,
      });
    } else {
      console.log(`updateAccessToken() Error: ${error.message}`);
      return res.status(401).json({
        msg: "Token tidak valid!",
        success: false,
      });
    }
  }
};
