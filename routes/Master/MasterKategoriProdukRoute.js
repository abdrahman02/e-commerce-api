import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { validate } from "../../middlewares/validationMiddleware.js";
import {
  createKategoriProduk,
  deleteKategoriProduk,
  getAllKategoriProduk,
  getSingleKategoriProduk,
  updateKategoriProduk,
} from "../../controllers/Master/MasterKategoriProdukController.js";
import {
  createKategoriProdukValidator,
  updateKategoriProdukValidator,
} from "../../validators/Master/kategoriProdukValidator.js";

const router = express.Router();

router.get(
  "/api/get-all-kategori-produk",
  authMiddleware,
  getAllKategoriProduk
);
router.get(
  "/api/get-single-kategori-produk/:idKategoriProduk",
  authMiddleware,
  getSingleKategoriProduk
);
router.post(
  "/api/create-kategori-produk",
  authMiddleware,
  createKategoriProdukValidator,
  validate,
  createKategoriProduk
);
router.put(
  "/api/update-kategori-produk/:idKategoriProduk",
  authMiddleware,
  updateKategoriProdukValidator,
  validate,
  updateKategoriProduk
);
router.delete(
  "/api/delete-kategori-produk/:idKategoriProduk",
  authMiddleware,
  deleteKategoriProduk
);

export default router;
