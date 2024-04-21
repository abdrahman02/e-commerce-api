import express from "express";
import guestMiddleware from "../../middlewares/guestMiddleware.js";
import { registerUserValidator } from "../../validators/userValidator.js";
import { validate } from "../../middlewares/validationMiddleware.js";
import {
  registerUser,
  emailConfirm,
  loginUser,
} from "../../controllers/Master/MasterUserController.js";

const router = express.Router();

router.post(
  "/api/register",
  guestMiddleware,
  registerUserValidator,
  validate,
  registerUser
);
router.get("/api/email-confirm/:token", emailConfirm);
router.post("/api/login", loginUser);

export default router;
