import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
  createProduk,
  deleteProduk,
  getAllProduk,
  getSingleProduk,
  updateProduk,
} from "../../controllers/Landing/LandingProdukController.js";
import { createProdukValidator } from "../../validators/Landing/produkValidator.js";

const router = express.Router();

router.get("/api/get-all-produk", authMiddleware, getAllProduk);
router.get("/api/get-single-produk", authMiddleware, getSingleProduk);
router.post("/api/create-produk", authMiddleware, createProdukValidator, createProduk);
router.put("/api/update-produk/:idProduk", authMiddleware, createProdukValidator, updateProduk);
router.delete("/api/delete-produk/:idProduk", authMiddleware, deleteProduk);

export default router;