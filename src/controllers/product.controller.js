import mongoose from "mongoose"
import { productDTO } from "../dtos/product.dto.js"
import cloudinary from "../config/cloudinary.js"
import { productModel } from "../models/product.model.js"

class ProductCantrollers {
    async getAllProduct(req, res) {
        const userId = req.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        try {
            const products = await productModel.find({ userId: userId })
            const productsDto = products.map(product => productDTO(product))
            res.status(200).json(productsDto)
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }

    async createProduct(req, res) {
        const userId = req.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const { title, author, published, pages, status } = req.body;
        try {
            const uploadResult = await cloudinary.uploader.upload(req.file?.path, {
                folder: 'user_images',
                transformation: [{ fetch_format: "auto", quality: "auto" }]
            });
            const imageUrl = uploadResult.secure_url;

            const product = await productModel.create({
                title,
                author,
                image: imageUrl,
                published,
                pages,
                status,
                userId
            });

            const productDto = productDTO(product);
            res.status(201).json(productDto);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async updateProduct(req, res) {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const userId = req.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        try {
            const product = await productModel.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Book not fount' });
            }

            if (product.userId != userId) {
                return res.status(400).json({ message: 'This book does not belong to you.' });
            }
            const reqData = req.body
            if (req.file?.path) {
                const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'user_images',
                    transformation: [{ fetch_format: "auto", quality: "auto" }]
                });
                const imageUrl = uploadResult.secure_url;
                const products = await productModel.findByIdAndUpdate(id, { ...reqData, image: imageUrl }, { new: true })
                const productDto = productDTO(products)
                res.status(200).json(productDto)
            } else {
                const products = await productModel.findByIdAndUpdate(id, reqData, { new: true })
                const productDto = productDTO(products)
                res.status(200).json(productDto)
            }
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const userId = req.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        try {
            const product = await productModel.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Book not fount' });
            }

            if (product.userId != userId) {
                return res.status(404).json({ message: 'This book does not belong to you.' });
            }
            const products = await productModel.findByIdAndDelete(id)
            const productDto = productDTO(products)
            res.status(200).json(productDto)
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }

    async getOneProduct(req, res) {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const userId = req.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        try {
            const product = await productModel.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Book not fount' });
            }

            if (product.userId != userId) {
                return res.status(404).json({ message: 'This book does not belong to you.' });
            }

            const productDto = productDTO(product)
            res.status(200).json(productDto)
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }
}

export default new ProductCantrollers