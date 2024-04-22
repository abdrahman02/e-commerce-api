import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { updateAccessToken } from "../utils/updateAccessToken.js";

dotenv.config();
const authMiddleware = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  if (!accessToken)
    return res.status(401).json({
      msg: "Akses ditolak karena tidak memiliki token!",
      success: false,
    });

  try {
    const decoded = await jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY_ACC
    );
    req.user = decoded.user;
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
