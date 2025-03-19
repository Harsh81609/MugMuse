// Models
import User from "../models/users.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js"

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, deliveryAddress } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ status:false,msg: "Order must contain items." });
    }

    const firstProduct = await Product.findById(items[0].productId);
    if (!firstProduct) {
      return res.status(400).json({status:false,msg: "Invalid menu item selected." });
    }
    

    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    
    const newOrder = new Order({
      userId,
      item: items,
      totalAmount,
      deliveryAddress,
      status: "pending",
    });

    await newOrder.save();

    // Update menu item sales
    for (const item of items) {
      await Product.findByIdAndUpdate(item.menuItemId, {
        $inc: { sales: item.quantity },
      });
    }

    await User.findByIdAndUpdate(userId, { $push: { orders: newOrder._id } });

    res
      .status(201)
      .json({ status:true,msg: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error in placeOrder Controller : ", error);
    res.status(500).json({ status:false,msg: "Internal Server Error" });
  }
};

export const getUsersAllOrders = async (req, res) => {
  const userId = req.user._id;
  try {
    const orders = await Order.find({ userId }).populate("item.productId").sort({ createdAt: -1 });
    res.status(200).json({status:true,orders});
  } catch (error) {
    console.error("Error in getUsersAllOrders Controller: ", error);
    res.status(500).json({ status:false,msg: "Internal Server Error" });
  }
};

export const getOrderDetails = async (req, res) => {
  const userId = req.user._id;
  const { id: orderId } = req.params;
  try {
    const user = await User.findById(userId).populate("orders");
    if (!user) {
      return res.status(404).json({ status:false,msg: "User Not Found" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ status:false,msg: "Order Not Found" });
    }

    res.status(200).json({ status:true,order });
  } catch (error) {
    console.error("Error in getOrder Controller: ", error);
    res.status(500).json({ status:false,msg: "Internal Server Error" });
  }
};

export const updateStatusOfOrder = async (req, res) => {
  const { status } = req.body;
  const { id: orderId } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ status:false,msg: "Order Not Found" });
    }

    res.status(200).json({ msg: "Order Status Updated Successfully", order });
  } catch (error) {
    console.error("Error in updateStatusOfOrder: ", error);
    res.status(500).json({ status:false,msg: "Internal Server Error" });
  }
};

export const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const userId = req.user._id;
  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ status:false,msg: "Order Not Found" });
    }

    await User.findByIdAndUpdate(order.userId, { $pull: { orders: orderId } });
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ status:true,msg: "Order Deleted Successfully" });
  } catch (error) {
    console.error("Error in placeOrder Controller: ", error);
    res.status(500).json({ status:false,msg: "Internal Server Error" });
  }
};
