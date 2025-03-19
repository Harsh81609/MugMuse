import fs from "fs";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

//Model
import User from "../models/users.model.js";

export const getUser = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ status:true,msg: "User Not Found" });
    }
    res.status(200).json({status:true,user});
  } catch (error) {
    console.error("Error in getUser Controller: ", error);
    res.status(500).json({ status:false,msg: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.user._id;
    const { name, email, currentPass, newPass, address, phone } = req.body;
    const image = req.file ? req.file.filename : null;

    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ status:false,msg: result.array() });
    }

    let user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ status:false,msg: "User Not Found" });
    }

    if ((currentPass && !newPass) || (!currentPass && newPass)) {
      return res.status(400).json({ status:false,msg: "Please provide both passwords" });
    }

    if (currentPass && newPass) {
      const isMatch = await bcrypt.compare(currentPass, user.password);
      if (!isMatch)
        return res.status(400).json({ status:false,msg: "Current password is incorrect" });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPass, salt);
    }

    if (req.file) {
      const oldImagePath = `uploads/users/${user.image}`;
      if(fs.existsSync(oldImagePath)){
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error(`Error deleting old image at ${oldImagePath}:`, err);
            throw err;
          }
        });
      }
      user.image=image
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.address = address || user.address;
    user.phone = phone || user.phone;

    user = await user.save();

    user.password = null;
    res.status(200).json({status:true,user});
  } catch (error) {
    console.error("Error in updateUser Controller: ", error);
    res.status(500).json({ status:false,msg: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ status:false,msg: "User Not Found" });
    }

    const oldImagePath = `uploads/users/${user.image}`;
    if (fs.existsSync(oldImagePath)) {
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error(`Error deleting old image at ${oldImagePath}:`, err);
          throw err;
        }
      });
    }

    res.cookie("authToken", "", { maxAge: 0, httpOnly: true, sameSite: "Strict" });

    await User.findByIdAndDelete(id);
    res.status(200).json({ status:true,msg: "Deleted Successfully", user });
  } catch (error) {
    console.error("Error in deleteUser Controller: ", error);
    res.status(500).json({ status:false,msg: "Internal Server Error" });
  }
};