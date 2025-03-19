import express from "express";
import {getProducts, createProducts, deleteProducts, updateProduct, getOneProduct, featuredProduct} from "../controllers/products.controller.js"
import { adminValidator, protectRoute } from "../middleware/auth.middleware.js";
import { uploadProduct } from "../utils/multer/multer.js";

const router = express.Router();

router.get("/", getProducts)
router.get("/featured",featuredProduct);
router.get("/:id",protectRoute,getOneProduct);
router.post("/",uploadProduct.single('file'),protectRoute,adminValidator, createProducts);
router.put("/:id",uploadProduct.single('file'),protectRoute,adminValidator, updateProduct);
router.delete("/:id",protectRoute,adminValidator, deleteProducts);

export default router;