import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { updateAccessToken } from "../utils/updateAccessToken.js";
import User from "../models/Master/User.js";

dotenv.config();
const authMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization)
    return res.status(401).json({
      msg: "Akses ditolak karena tidak memiliki token!",
      success: false,
    });
  const accessToken = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY_ACC);
    req.user = decoded.user;
    const checkEmailVerify = await User.findOne({ email: req.user.email });
    if (checkEmailVerify.email_verified_at === null)
      return res
        .status(403)
        .json({ msg: "Email user belum dikonfirmasi!", success: false });
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      await updateAccessToken(req, res, next);
    } else {
      console.log(`authMiddleware() Error: ${error.message}`);
      return res.status(401).json({
        msg: "Token tidak valid!",
        success: false,
      });
    }
  }
};

export default authMiddleware;
