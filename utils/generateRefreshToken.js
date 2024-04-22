import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const  generateRefreshToken = (payload, rememberMe = false) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET_KEY_REF,
    rememberMe || rememberMe === true
      ? { expiresIn: "7d" }
      : { expiresIn: "25s" }
  );
}

export default generateRefreshToken;
