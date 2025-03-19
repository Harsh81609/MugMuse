import mongoose from "mongoose";
import fs from "fs";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ status: true, data: products });
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({ status: true, mmsg: "Server Error" });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const products = await Product.findById(productId);
    if (!productId) {
      res.status(404).json({ status: false, msg: "Product Not Found" })
    }
    res.status(200).json({ status: true, data: products });
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

export const createProducts = async (req, res) => {
  const { name, price, description, category,isFeatured } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !price || !description || !category ||!isFeatured) {
    return res
      .status(400)
      .json({ status: false, msg: "Please provide all fields" });
  }

  const newProduct = new Product({
    name, price, description, category, image,isFeatured
  });

  try {
    await newProduct.save();
    res.status(201).json({ status: true, data: newProduct });
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category,isFeatured } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ status: true, msg: "Invalid Product Id" });
  }

  try {
    const product = await Product.findById(id);

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.isFeatured=isFeatured||product.isFeatured;

    if (req.file) {
      const oldPath = `uploads/product/${product.image}`;
      if (fs.existsSync(oldPath)) {
        fs.unlink(oldPath, (err) => {
          if (err) {
            console.error(`Error in deleting ${oldPath}: `, err);
            throw err;
          }
        })
      }
      product.image=req.file.filename;
    }

    await product.save();
    res.status(200).json({ status: true, data: product  });
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({ status: false, msg: "Internal Server Error" })
  }
};

export const deleteProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ status: false, msg: "Product Not Found" });
    }

    const oldPath = `uploads/product/${product.image}`;

    if (fs.existsSync(oldPath)) {
      fs.unlink(oldPath, (err) => {
        if (err) {
          console.error(`Error in deleting old image at ${oldPath}: `, err);
          throw err;
        }
      })
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ status: true, msg: "Product Deleted" });
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(404).json({ status: false, msg: "Internal Server Error" });
  }
};

export const featuredProduct=async(req,res)=>{
  try {
    const products = await Product.find({isFeatured:true});
    if(!products){
      return res.status(404).json({status:false,msg:"No featured Products Found"});
    }

    res.status(200).json({status:true,products});
  } catch (error) {
    console.error("Error in featuredProduct Controller: ",error);
    res.status(500).json({status:false,msg:"Internal Server Error"});
  }
}