import { body } from "express-validator";
import path from "path";

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
  body("status")
    .isIn(["aktif", "tidak_aktif"])
    .withMessage('Status produk hanya boleh berisi "aktif" atau "tidak_aktif"!')
    .isString()
    .withMessage("Status produk hanya dapat berisi aktif atau tidak aktif!")
    .notEmpty()
    .withMessage("Status produk tidak boleh kosong!"),
  body("idUser").notEmpty().withMessage("Id user tidak boleh kosong!"),
  body("idKategoriProduk")
    .notEmpty()
    .withMessage("Kategori produk tidak boleh kosong!"),
];

export const imageValidator = (req, res, next) => {
  try {
    if (!req.files || !req.files.gambar) {
      throw new Error("Gambar tidak boleh kosong!");
    }
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    if (Array.isArray(req.files.gambar)) {
      req.files.gambar.forEach((file, index) => {
        const extName = path.extname(file.name).toLowerCase();
        if (!allowedExtensions.includes(extName)) {
          throw new Error(
            `Ekstensi file gambar ke ${index + 1} harus jpg, jpeg, atau png!`
          );
        }

        if (file.data.length > 15000000) {
          throw new Error(
            `Ukuran file gambar ke ${index + 1} tidak boleh lebih dari 15MB!`
          );
        }
      });
    } else {
      const file = req.files.gambar;
      const extName = path.extname(file.name).toLowerCase();
      if (!allowedExtensions.includes(extName)) {
        throw new Error(
          `Ekstensi file gambar ke ${index + 1} harus jpg, jpeg, atau png!`
        );
      }

      if (file.data.length > 15000000) {
        throw new Error(
          `Ukuran file gambar ke ${index + 1} tidak boleh lebih dari 15MB!`
        );
      }
    }
    if (req.files.gambar > 3) throw new Error("Maksimal upload 3 gambar");
    next();
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: error.message }] });
  }
};
