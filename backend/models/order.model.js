import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    item: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity:{
          type:Number,
          required: true,
          min:1,
        },
        price:{
          type: Number,
          required: true,
          min:0,
        }
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min:0
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "delivered"],
      default: "pending",
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;