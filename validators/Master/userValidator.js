import { body } from "express-validator";
import argon2 from "argon2";
import User from "../../models/Master/User.js";

export const registerUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("Nama tidak boleh kosong!")
    .withMessage("Nama hanya dapat berisi huruf atau kombinasi huruf dan angka"),
  body("username")
    .notEmpty()
    .isString()
    .withMessage("Username hanya dapat berisi huruf atau kombinasi huruf dan angka")
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
    .isString()
    .withMessage("Email hanya dapat berisi huruf atau kombinasi huruf dan angka")
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
    .isString()
    .withMessage("Password hanya dapat berisi huruf atau kombinasi huruf dan angka")
    .isStrongPassword()
    .withMessage("Password minimal 8 karakter serta kombinasi karakter!"),
  body("confPassword")
    .notEmpty()
    .withMessage("Konfirmasi Password tidak boleh kosong!")
    .isString()
    .withMessage("Konfirmasi Password hanya dapat berisi huruf atau kombinasi huruf dan angka")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Konfirmasi Password harus sama dengan Password!");
      }
      return true;
    }),
  body("phone")
    .notEmpty()
    .withMessage("No. Handphone tidak boleh kosong!")
    .isString()
    .withMessage("No. Hanphone hanya dapat berisi huruf atau kombinasi huruf dan angka")
    .custom(async (value) => {
      const existingPhone = await User.findOne({ phone: value });
      if (existingPhone) {
        throw new Error("Nomor hanphone sudah digunakan!");
      }
    }),
];

export const loginUserValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email tidak boleh kosong!")
    .isString()
    .withMessage("Email hanya dapat berisi huruf atau kombinasi huruf dan angka")
    .isEmail()
    .withMessage("Email tidak valid!")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (!user) {
        throw new Error("Email atau password salah!");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password tidak boleh kosong!")
    .isString()
    .withMessage("Password hanya dapat berisi huruf atau kombinasi huruf dan angka")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: req.body.email });

      const isMatch = await argon2.verify(user.password, value);

      if (!isMatch) {
        throw new Error("Email atau password salah!");
      }
    }),
];
