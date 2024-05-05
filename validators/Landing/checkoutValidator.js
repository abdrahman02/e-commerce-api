import { body } from "express-validator";

export const createTokenMidtransValidator = [
  body("idUser")
    .notEmpty()
    .withMessage("User tidak boleh kosong!")
    .custom(async (value) => {
      const existingData = await User.findOne({ _id: value });
      if (!existingData) throw Error("User tidak ditemukan!");
      return true;
    }),
  body("produk").notEmpty().withMessage("Produk tidak boleh kosong!"),
  body("totalAmount").notEmpty().withMessage("Total harga tidak boleh kosong!"),
];
