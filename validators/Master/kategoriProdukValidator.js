import { body } from "express-validator";
import KategoriProduk from "../../models/Master/KategoriProduk.js";

export const createKategoriProdukValidator = [
  body("namaKategoriProduk")
    .notEmpty()
    .withMessage("Nama kategori produk tidak boleh kosong!")
    .isString()
    .withMessage(
      "Nama kategori produk hanya dapat berisi huruf atau kombinasi huruf dan angka!"
    )
    .custom(async (value) => {
      const existingData = await KategoriProduk.findOne({
        nama_kategori_produk: value,
      });
      if (existingData)
        throw new Error("Nama kategori produk sudah digunakan!");
    }),
];

export const updateKategoriProdukValidator = [
  body("namaKategoriProduk")
    .notEmpty()
    .withMessage("Nama kategori produk tidak boleh kosong!")
    .isString()
    .withMessage(
      "Nama kategori produk hanya dapat berisi huruf atau kombinasi huruf dan angka!"
    )
    .custom(async (value, { req }) => {
      const { idKategoriProduk } = req.params;
      const existingData = await KategoriProduk.findOne({
        nama_kategori_produk: value,
        _id: { $ne: idKategoriProduk },
      });
      if (existingData)
        throw new Error("Nama kategori produk sudah digunakan!");
    }),
];
