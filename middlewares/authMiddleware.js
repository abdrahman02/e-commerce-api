import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  dotenv.config();
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({
        msg: "Akses ditolak karena tidak memiliki token!",
        success: false,
      });
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.user._id);
    if (!user) {
      return res
        .status(401)
        .json({ msg: "Token tidak valid, otentikasi gagal", success: false });
    }
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(`authMiddleware(), Error: ${error.message}`);
    return res.status(401).json({ msg: "Token tidak valid!", success: false });
  }
};

export default authMiddleware;
