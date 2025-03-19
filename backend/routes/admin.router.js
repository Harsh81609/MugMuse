import { Router } from "express";
import multer from "multer";

// Middleware
import { adminValidator, protectRoute } from "../middleware/auth.middleware.js";

// Controller Functions
import { adminLogin, createAdmin, getStaticsOfAll } from "../controllers/admin.controller.js";

// Utils
import { uploadUser } from "../utils/multer/multer.js";

const router = Router();

router.post("/login",adminLogin);
router.post("/create-admin",uploadUser.single('file'), createAdmin);
router.post("/stats",protectRoute,adminValidator, getStaticsOfAll);

export default router;
