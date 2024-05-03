import { body } from "express-validator";
import Produk from "../../models/Landing/Produk.js";
import User from "../../models/Master/User.js";

export const getAllByIdUserDataOnCartValidator = [
  body("idUser")
    .notEmpty()
    .withMessage("User tidak boleh kosong!")

    .custom(async (value) => {
      const existingData = await User.findOne({ _id: value });
      if (!existingData) throw Error("User tidak ditemukan!");
      return true;
    }),
];

export const createDataOnCartValidator = [
  body("idProduk")
    .notEmpty()
    .withMessage("Produk tidak boleh kosong!")

    .custom(async (value) => {
      const existingData = await Produk.findOne({ _id: value });
      if (!existingData) throw Error("Produk tidak ditemukan!");
      return true;
    }),
  body("idUser")
    .notEmpty()
    .withMessage("User tidak boleh kosong!")

    .custom(async (value) => {
      const existingData = await User.findOne({ _id: value });
      if (!existingData) throw Error("User tidak ditemukan!");
      return true;
    })
    .custom(async (value, { req }) => {
      const checkedData = await Produk.findOne({ _id: req.body.idProduk });
      if (!checkedData || checkedData === undefined)
        throw new Error("Produk tidak ditemukan");
      else if (checkedData.id_seller == value)
        throw new Error(
          "Tidak bisa menambahkan produk sendiri kedalam keranjang!"
        );
      return true;
    }),
];
