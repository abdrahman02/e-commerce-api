import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { validate } from "../../middlewares/validationMiddleware.js";
import {
  createProduk,
  deleteProduk,
  getAllProduk,
  getSingleProduk,
  updateProduk,
} from "../../controllers/Landing/LandingProdukController.js";
import {
  createProdukValidator,
  imageValidator,
} from "../../validators/Landing/produkValidator.js";

const router = express.Router();

router.get("/api/get-all-produk", authMiddleware, getAllProduk);
router.get("/api/get-single-produk/:idProduk", authMiddleware, getSingleProduk);
router.post(
  "/api/create-produk",
  authMiddleware,
  createProdukValidator,
  validate,
  imageValidator,
  createProduk
);
router.put(
  "/api/update-produk/:idProduk",
  authMiddleware,
  createProdukValidator,
  validate,
  imageValidator,
  updateProduk
);
router.delete("/api/delete-produk/:idProduk", authMiddleware, deleteProduk);

export default router;
