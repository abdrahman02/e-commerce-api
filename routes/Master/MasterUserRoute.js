import express from "express";
import {
  registerUser,
  loginUser,
} from "../../controllers/Master/MasterUserController.js";
import { registerUserValidator } from "../../validators/userValidator.js";
import { validateRegistration } from "../../middlewares/validationMiddleware.js";

const router = express.Router();

router.post(
  "/api/register",
  registerUserValidator,
  validateRegistration,
  registerUser
);
router.post("/api/login", loginUser);

export default router;
