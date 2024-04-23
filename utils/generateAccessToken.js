import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const generateAccessToken = (payload, rememberMe = false) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET_KEY_ACC,
    rememberMe || rememberMe === true
      ? { expiresIn: "3d" }
      : { expiresIn: "15m" }
  );
};
export default generateAccessToken;