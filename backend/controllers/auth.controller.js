import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "../models/users.model.js";
import { generateTokenAndSetCookie } from "../utils/cookie/generateTokenAndSetCookie.js";
import { sendWelcomeEmail } from "../utils/email/email.js"

export const register = async (req, res) => {
 try {
    const { name, email, password, address, phone } = req.body;
    const image = req.file ? req.file.filename : null;

    // Validate the request body
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ status: false, err: result.array() });
    }

    const alreadyExisting = await User.findOne({ email });
    if (alreadyExisting) {
      return res.status(400).json({ status: false, err: "Email already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const encodedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: encodedPass,
      address,
      phone,
      image
    });

    await newUser.save();

    generateTokenAndSetCookie(newUser._id, res);

    await sendWelcomeEmail(newUser.email, newUser.name);
    newUser.password = undefined;
    res.status(201).json({ status: true, msg: "User registered successfully", data: newUser });
  } catch (error) {
    console.error("Error in registor: ", error);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ status: false, msg: result.array() });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: false, msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, msg: "Invalid credentials" });
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
      image: user.image
    });

  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("authToken", "", { maxAge: 0, httpOnly: true, sameSite: "Strict" });
    // res.clearCookie("jwt");  If upper logic will not then alternative
    res.status(200).json({ status: true, msg: "Loggged Out successfully" });
  } catch (error) {
    console.error("Error in logout controller: ", error);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: false, msg: "User Not Found" });
    }

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpireAt = resetPasswordTokenExpireAt;

    await user.save();

    await resetPasswordEmail(user.email, user.name, `${process.env.BASE_URL}/reset-password?token=${resetPasswordToken}`)

    res.status(200).json({ status: true, msg: "Password reset link send to your email" });
  } catch (error) {
    console.error("Error in forgotPassword Controller: ", error);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.query;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpireAt: {
        $gt: Date.now()
      }
    });

    if (!user) {
      return res.status(400).json({ status: false, msg: "Invalid or Expired reset token" });
    }

    const salt = await bcrypt.genSalt(10);
    const encodedPass = await bcrypt.hash(password, salt);

    user.password = encodedPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpireAt = undefined;

    await user.save();

    await confirmationResetPassword(user.email, user.name);

    res.status(200).json({ status: true, msg: "Password Reset Successfully" });
  } catch (error) {
    console.error("Error in resetPassword Controller: ", error);
    res.status(500).json({ status: false, msg: "Internal Server Error" })
  }
};

export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ status: false, msg: "Unauthorized: No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ status: false, msg: "Unauthorized: Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ status: true, msg: "Authenticated", user });
  } catch (error) {
    console.error("Error in checkAuth Controller: ", error);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}