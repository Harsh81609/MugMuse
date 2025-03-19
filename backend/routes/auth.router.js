import { Router } from "express";

import { uploadUser } from "../utils/multer/multer.js";

// Middleware
import { loginInputValidator, userInputValidator } from "../middleware/inputSenetizer.middleware.js";

// Controller Functions
import { checkAuth, forgotPassword, login, logout, register, resetPassword } from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/register",
  uploadUser.single("file"),
  userInputValidator,
  register
);
router.post("/check-auth",checkAuth)
router.post("/login", loginInputValidator, login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

export default router;