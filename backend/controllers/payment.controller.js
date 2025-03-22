// Models
import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";

// Utils
import generatePaymentSession from "../utils/payment/generatePaymentSession.js";
import verifyPaymentStatus from "../utils/payment/verifyPaymentStatus.js";

export const orderPayment = async (req, res) => {
  const { orderId, paymentMethod } = req.body;
  const userId = req.user._id;
  try {
    const order = await Order.findById(orderId).populate("item.productId");
    if (!order) {
      return res.status(404).json({ status: false, msg: "Order Not Found" });
    }

    const totalAmount = order.item.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    
    const payment = new Payment({
      userId,
      orderId,
      amount: totalAmount,
      status: "pending",
      paymentMethod,
    });

    if (paymentMethod === "card") {
      // For card payment method
      const lineItems = order.item.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.productId.name,
            images: [
              `${process.env.TEMP_SERVER_IMAGE_URL}/product/image/${item.productId.image}`,
            ],
          },
          unit_amount: Math.round(item.price * 100), //Convert into paisa
        },
        quantity: item.quantity,
      }));
      lineItems.forEach((item, index) => {
        console.log(
          `Line Item ${index} Image:`,
          item.price_data.product_data.images
        );
      });

      const session = await generatePaymentSession(lineItems);
      if (!session || !session.url) {
        return res.status(500).json({ status: false, msg: "Stripe session creation failed" });
      }

      payment.transactionId = session.id;
      await payment.save();

      return res
        .status(200)
        .json({ status: true, paymentUrl: session.url, paymentId: payment._id });

    } else {
      // For cash on delivery payment method
      order.status = "pending";
      await order.save();
      await payment.save();
      return res.status(200).json({
        status: true,
        msg: "Order placed successfully. Pay on delivery.",
        paymentid: payment._id,
      });
    }
  } catch (error) {
    console.error("Error in payment Controller: ", error);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

export const verifyOrderPayment = async (req, res) => {
  const { transactionId } = req.body;
  try {
    const payment = await Payment.findOne({transactionId});
    if (!payment) {
      return res.status(404).json({ status: false, msg: "Payment Not Found" });
    }

    const paymentStatus = await verifyPaymentStatus(transactionId);
    console.log(`Payment status for transaaction ${transactionId}: ${paymentStatus}`)

    switch (paymentStatus) {
      case 'succeeded':
        payment.status = "success";
        break;

      case 'requires_action':
      case 'requires_payment_method':
        payment.status = 'pending';
        break;
      case 'canceled':
        payment.status = 'failed';
        break;

      default:
        payment.status = 'failed';
    }

    payment.transactionId = transactionId;
    await payment.save();

    const order = await Order.findById(payment.orderId);
    if (order) {
      if (payment.status === 'success' && order.status !== 'confirmed') {
        order.status = "confirmed";
        await order.save();
      }
    }

    if (payment.status === 'success') {
      return res.status(200).json({ status: true, msg: 'Payment successful!', payment });
    } else {
      return res.status(400).json({ status: false, msg: 'Payment Failed' });
    }
  } catch (error) {
    console.error("Error in verifyOrderPayment Controller: ", error);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};