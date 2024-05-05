import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { createTokenMidtransValidator } from "../../validators/Landing/checkoutValidator.js";
import { createTokenMidtrans } from "../../controllers/Landing/LandingCheckoutController.js";

const router = express.Router();

router.post(
  "/api/checkout",
  authMiddleware,
  createTokenMidtransValidator,
  validate,
  createTokenMidtrans
);

export default router;
