import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Models
import Admin from "../models/admin.model.js";
import User from "../models/users.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

// Utils
import { generateTokenAndSetCookie } from "../utils/cookie/generateTokenAndSetCookie.js";
import { sendWelcomeEmail } from "../utils/email/email.js";

// To get static detail of user, restuarants, total revenue, etc..
export const getStaticsOfAll = async (req, res) => {
  const { productId } = req.body;
  try {
    const productForChart = await Order.findById(productId);

    if (!productForChart) {
      return res.status(400).json({ status: false, msg: "menuItemId is required" });
    }

    const totalUsers = await User.aggregate([
      {
        $count: "totalUsers",
      },
    ]);

    const totalProduct = await Product.aggregate([
      {
        $count: "totalRestaurants",
      },
    ]);

    const totalRevenue = await Order.aggregate([
      {
        $match: {
          status: "delivered",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "totalAmount",
          },
        },
      },
    ]);

    const topItems = await Product.find().sort({ sales: -1 }).limit(10);

    res.status(200).json({
      totalUsers,
      totalProduct,
      totalRevenue,
      productForChart,
      topItems,
    });
  } catch (error) {
    console.error("Error in getStaticsOfAll Controller: ", error);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, address, phone, role, permission } =
      req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !email || !password || !address || !phone || !role) {
      return res.status(400).json({ status: false, msg: "Required all fields" });
    }

    const alreadyExisting = await User.findOne({ email });
    if (alreadyExisting) {
      return res.status(400).json({ status: false, msg: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const encodedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: encodedPass,
      address,
      phone,
      role,
      image
    });

    await newUser.save();

    const admin = new Admin({
      userId: newUser._id,
      permission: permission,
    });

    await admin.save();

    generateTokenAndSetCookie(newUser._id, res);
    await sendWelcomeEmail(newUser.email, newUser.name);

    newUser.password = undefined;
    res
      .status(201)
      .json({ status: true, msg: "User registered successfully", data: newUser });
  } catch (error) {
    console.error("Error in admin: ", error);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received:", { email });

  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ status: false, msg: result.array() });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: false, msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, msg: "Invalid email or password" });
    }

    const adminPermission = await Admin.findOne({ userId: user.id });
    if (!adminPermission) {
      return res.status(403).json({ status: false, msg: "Unauthorized access" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      phone: user.phone,
      subscription: user.subscription,
      orders: user.orders,
    });

    console.log("Login successful for admin:", email);
  } catch (error) {
    console.error("Error in adminLogin controller:", error);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}