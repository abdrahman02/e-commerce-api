import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import isAdminMiddleware from "../../middlewares/isAdminMiddleware.js";
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
  isAdminMiddleware,
  getAllKategoriProduk
);
router.get(
  "/api/get-single-kategori-produk/:idKategoriProduk",
  authMiddleware,
  isAdminMiddleware,
  getSingleKategoriProduk
);
router.post(
  "/api/create-kategori-produk",
  authMiddleware,
  isAdminMiddleware,
  createKategoriProdukValidator,
  validate,
  createKategoriProduk
);
router.put(
  "/api/update-kategori-produk/:idKategoriProduk",
  authMiddleware,
  isAdminMiddleware,
  updateKategoriProdukValidator,
  validate,
  updateKategoriProduk
);
router.delete(
  "/api/delete-kategori-produk/:idKategoriProduk",
  authMiddleware,
  isAdminMiddleware,
  deleteKategoriProduk
);

export default router;
