import express from "express";
import guestMiddleware from "../../middlewares/guestMiddleware.js";
import { registerUserValidator } from "../../validators/userValidator.js";
import { validateRegistration } from "../../middlewares/validationMiddleware.js";
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
  validateRegistration,
  registerUser
);
router.get("/api/email-confirm/:token", emailConfirm);
router.post("/api/login", loginUser);

export default router;
