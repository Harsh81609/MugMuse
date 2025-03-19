import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength:3
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
      minLength:5
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "customer", 
      enum:["customer","admin"],
    },
    phone: {
      type: Number,
      required: true,
      maxLength: 10,
    },
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Order"
    }],
    image: {
      type: String,
      default:""
    },
    resetPasswordToken: String,
    resetPasswordTokenExpireAt:Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;