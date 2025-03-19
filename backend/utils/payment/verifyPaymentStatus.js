import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const verifyPaymentStatus = async (transactionId) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(transactionId);
        if(!session.payment_intent){
            throw new Error("No Payment Intent found for the session");
        }

        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
        return paymentIntent.status;
    } catch (error) {
        console.error("Error in verifyPaymentStatus Utils: ", error);
        throw error;
    }
}

export default verifyPaymentStatus