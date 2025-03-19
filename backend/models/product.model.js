import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required:true
    },
    category: {
      type: String,
      required: true
    },
    sales: {
      type: Number,
      default: 0 
    },
    isFeatured:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true
  });

const Product = mongoose.model("Product", productSchema); // cafe products

export default Product;