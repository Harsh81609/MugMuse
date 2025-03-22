import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const generatePaymentSession = async (lineItems) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.BASE_URL}/payment?status=verify&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/payment?status=cancel`,
    });
    return session;
  } catch (error) {
    console.error("Error in generatePaymentSession Utils: ", error);
    throw error;
  }
};

export default generatePaymentSession;
