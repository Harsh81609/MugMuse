import express from "express";

// Middleware
import { protectRoute } from "../middleware/auth.middleware.js";

// Controller Functions
import { orderPayment, verifyOrderPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/orders", protectRoute, orderPayment);
router.post("/orders/verify", protectRoute, verifyOrderPayment);

export default router;
