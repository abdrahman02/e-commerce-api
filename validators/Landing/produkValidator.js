import { body } from "express-validator";

export const createProdukValidator = [
  body("namaProduk")
    .isString()
    .withMessage(
      "Nama produk hanya dapat berisi huruf atau kombinasi huruf dan angka!"
    )
    .notEmpty()
    .withMessage("Nama produk tidak boleh kosong!"),
  body("deskripsi")
    .isString()
    .withMessage(
      "Deskripsi produk hanya dapat berisi huruf atau kombinasi huruf dan angka!"
    )
    .notEmpty()
    .withMessage("Deskripsi produk tidak boleh kosong!"),
  body("harga")
    .isNumeric()
    .withMessage("Harga produk hanya dapat berisi angka!")
    .notEmpty()
    .withMessage("Harga produk tidak boleh kosong!"),
  body("stok")
    .isNumeric()
    .withMessage("Stok produk hanya dapat berisi angka!")
    .notEmpty()
    .withMessage("Stok produk tidak boleh kosong!"),
  body("jumlahTerjual")
    .isNumeric()
    .withMessage("Stok produk hanya dapat berisi angka!"),
  body("status")
    .isString()
    .withMessage(
      "Status produk hanya dapat berisi aktif atau tidak aktif!"
    )
    .notEmpty()
    .withMessage("Status produk tidak boleh kosong!"),
];
