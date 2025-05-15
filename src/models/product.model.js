import mongoose, { Schema, model } from "mongoose"

const ProductSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    published: { type: Number, required: true },
    pages: { type: Number, required: true },
    status: {
        type: String,
        enum: ['new', 'reading', 'finished'],
        required: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

export const productModel = model("Product", ProductSchema)