import express from "express"
import productControllers from "../controllers/product.controller.js"
import upload from "../middlewares/multer.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get("/get", authMiddleware, productControllers.getAllProduct)
router.post("/add", authMiddleware,  upload.single("image"), productControllers.createProduct)
router.put("/edit/:id", authMiddleware,  upload.single("image"), productControllers.updateProduct)
router.delete("/delete/:id", authMiddleware,  productControllers.deleteProduct)
router.get("/get-one/:id", authMiddleware, productControllers.getOneProduct)


export const productRoutes = router