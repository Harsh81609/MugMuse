import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneProduct } from "../../service/product";
import { placeOrder } from "../../service/order";
import { orderPayment } from "../../service/payment";
import { toast } from "react-toastify";

export default function PlaceOrder() {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const { productId } = useParams();
    const navigate = useNavigate();

    const image = import.meta.env.VITE_SERVER_URL + "/product/image/";

    useEffect(() => {
        const fetchOneProduct = async () => {
            const response = await getOneProduct(productId);
            if (response.data) {
                setProduct(response.data.data);
            } else {
                toast.error(response.data.msg);
            }
        };
        fetchOneProduct();
    }, [productId]);

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderItem = {
            "items": [
                {
                    productId: product._id,
                    quantity,
                    price: product.price * quantity
                }
            ],
            deliveryAddress
        }

        try {
            const orderResponse = await placeOrder(orderItem);
            if (orderResponse.data) {
                toast.success("Order placed successfully!");
            } else {
                toast.error("Failed to order item.");
            }
            const orderId = orderResponse.data.order._id;

            const payment = await orderPayment({ orderId, paymentMethod });
            if (payment.data) {
                toast.success("Redirecting to payment page!");
                window.location.href = payment.data.paymentUrl;
            } else {
                toast.error("Failed to order item.");
            }

        } catch (error) {
            toast.error("An error occurred while placing the order.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6 my-10"
        >
            <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">Place Your Order</h2>
            <div className="flex justify-center">
                <img
                    src={`${image}${product.image}`}
                    alt={product.name}
                    className="rounded-lg object-cover h-64 w-full max-w-lg shadow-md"
                />
            </div>
            <div className="mt-6">
                <label className="block text-lg font-medium text-gray-700">Delivery Address</label>
                <input
                    type="text"
                    className="w-full mt-2 p-3 bg-white text-black border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                />
            </div>
            <div className="mt-6 p-5 bg-gray-100 text-black rounded-lg shadow-sm">
                <div className="grid grid-cols-2 gap-4 text-lg font-semibold">
                    <p>Product Name:</p> <p>{product.name}</p>
                    <p>Price (per unit):</p> <p className="text-indigo-600 font-bold">₹{product.price}</p>
                    <p>Delivery Address:</p> <p>{deliveryAddress || "Not provided"}</p>
                    <p>Quantity:</p>
                    <div className="flex items-center space-x-3">
                        <button
                            type="button"
                            className="bg-gray-200 text-xl px-3 py-1 rounded-full hover:bg-gray-300"
                            onClick={handleDecrement}
                        >-</button>
                        <p>{quantity}</p>
                        <button
                            type="button"
                            className="bg-gray-200 text-xl px-3 py-1 rounded-full hover:bg-gray-300"
                            onClick={handleIncrement}
                        >+</button>
                    </div>
                    <p>Total Price:</p> <p className="text-green-600 font-bold">₹{product.price * quantity}</p>
                    <p>Payment Method:</p>
                    <div>
                        <select className="bg-gray-200 text-black" name="payment-method" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="card">Card</option>
                            <option value="cash on delivery">Cash On Delivery</option>
                        </select>
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="mt-6 w-full bg-indigo-600 text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all"
            >
                Confirm Order
            </button>
        </form>
    );
}