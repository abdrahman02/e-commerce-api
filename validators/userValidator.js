import { body } from "express-validator";
import User from "../models/User.js";

// console.log("body", body());
export const registerUserValidator = [
  body("name").notEmpty().withMessage("Nama tidak boleh kosong!"),
  body("username")
    .notEmpty()
    .withMessage("Username tidak boleh kosong!")
    .custom(async (value) => {
      const existingUsername = await User.findOne({ username: value });
      if (existingUsername) {
        throw new Error("Username sudah digunakan!");
      }
    }),
  body("email")
    .notEmpty()
    .withMessage("Email tidak boleh kosong!")
    .isEmail()
    .withMessage("Email tidak valid!")
    .custom(async (value) => {
      const existingEmail = await User.findOne({ email: value });
      if (existingEmail) {
        throw new Error("Email sudah digunakan!");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password tidak boleh kosong!")
    .isStrongPassword()
    .withMessage("Password minimal 8 karakter serta kombinasi karakter!"),
  body("confPassword")
    .notEmpty()
    .withMessage("Konfirmasi Password tidak boleh kosong!")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Konfirmasi Password harus sama dengan Password!");
      }
      return true
    }),
  body("phone")
    .notEmpty()
    .withMessage("No. Handphone tidak boleh kosong!")
    .custom(async (value) => {
      const existingPhone = await User.findOne({ phone: value });
      if (existingPhone) {
        throw new Error("Nomor hanphone sudah digunakan!");
      }
    }),
];
