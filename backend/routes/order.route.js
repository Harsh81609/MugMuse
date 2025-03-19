import { Router } from "express";

// Middleware
import { protectRoute } from "../middleware/auth.middleware.js";

// Controller functions
import { deleteOrder, getOrderDetails, getUsersAllOrders, placeOrder, updateStatusOfOrder } from "../controllers/order.controller.js";


const router = Router();

router.get("/:id", protectRoute, getOrderDetails);
router.get("/user/orders", protectRoute, getUsersAllOrders);
router.post("/", protectRoute, placeOrder);
router.put("/:id", protectRoute, updateStatusOfOrder);
router.delete("/:id", protectRoute, deleteOrder);

export default router;
