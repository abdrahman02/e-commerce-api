import express from "express";
import guestMiddleware from "../../middlewares/guestMiddleware.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
  loginUserValidator,
  registerUserValidator,
} from "../../validators/userValidator.js";
import { validate } from "../../middlewares/validationMiddleware.js";
import {
  registerUser,
  emailConfirm,
  loginUser,
  logoutUser,
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
router.post(
  "/api/login",
  guestMiddleware,
  loginUserValidator,
  validate,
  loginUser
);
route.post("/api/logout", authMiddleware, logoutUser);

export default router;
