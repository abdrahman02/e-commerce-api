import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
  getAllByIdUserDataOnCartValidator,
  createDataOnCartValidator,
} from "../../validators/Landing/cartValidator.js";
import { validate } from "../../middlewares/validationMiddleware.js";
import {
  getAllByIdUserDataOnCart,
  getSingleDataOnCart,
  createDataOnCart,
  addQuantityDataOnCart,
  deleteDataOnCart,
  reduceQuantityDataOnCart,
} from "../../controllers/Landing/LandingCartController.js";

const router = express.Router();

router.get(
  "/api/get-all-by-id-user-data-on-cart",
  authMiddleware,
  getAllByIdUserDataOnCartValidator,
  validate,
  getAllByIdUserDataOnCart
);

router.get(
  "/api/get-single-data-on-cart/:idCart",
  authMiddleware,
  getSingleDataOnCart
);

router.post(
  "/api/create-data-on-cart",
  authMiddleware,
  createDataOnCartValidator,
  validate,
  createDataOnCart
);

router.put(
  "/api/add-quantity-data-on-cart/:idCart",
  authMiddleware,
  addQuantityDataOnCart
);

router.put(
  "/api/reduce-quantity-data-on-cart/:idCart",
  authMiddleware,
  reduceQuantityDataOnCart
);

router.delete(
  "/api/delete-data-on-cart/:idCart",
  authMiddleware,
  deleteDataOnCart
);

export default router;
