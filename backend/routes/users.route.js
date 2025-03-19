import { Router } from "express";
import multer from "multer";

// Middleware
import { protectRoute } from "../middleware/auth.middleware.js";

// Controller Functions
import {
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/users.controller.js";

// Utils
import { uploadUser } from "../utils/multer/multer.js";

const router = Router();

router.get("/me", protectRoute, getUser);
router.put("/", protectRoute, uploadUser.single("file"), updateUser);
router.delete("/", protectRoute, deleteUser);

export default router;
