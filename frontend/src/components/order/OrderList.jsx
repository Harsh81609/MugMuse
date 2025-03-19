import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsersAllOrder } from "../../service/order";
import { toast } from "react-toastify";
import orderImage from "../../assets/others/cafe-intrior-image.jpg";

export default function OrderList() {
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getUsersAllOrder();
                console.log("Response from getUsersAllOrder:", response.data);

                if (response.data && Array.isArray(response.data.orders)) {
                    setOrderList(response.data.orders);
                } else {
                    console.warn("Unexpected response structure:", response.data);
                }
            } catch (error) {
                console.error("API Error:", error);
                toast.error(error.response?.data?.msg || "Failed to fetch orders");
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen p-6 bg-base-100 z-10">
            {orderList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {orderList.map((order) => {
                        return (
                            <div key={order._id} className="bg-white border rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105">
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Order ID: {order._id}</h2>
                                    <p className="text-gray-500 mt-1">Status: <span className="font-semibold capitalize">{order.status}</span></p>
                                    <p className="text-gray-500 mt-1">Total Amount: <span className="font-semibold">₹{order.totalAmount}</span></p>
                                    <p className="text-gray-500 mt-1">Delivery Address: {order.deliveryAddress}</p>
                                    <p className="text-gray-500 mt-1">Placed On: {new Date(order.createdAt).toLocaleDateString()}</p>

                                    <h3 className="text-md font-semibold mt-3 text-gray-700">Items:</h3>
                                    <div className="border-t mt-2 pt-2">
                                        {order.item.map((item) => {
                                            const { productId, quantity, price, _id } = item;
                                            if (!productId) return null;

                                            const image = `${import.meta.env.VITE_SERVER_URL}/product/image/${productId.image}`;

                                            return (
                                                <div key={_id} className="flex items-center gap-4 mt-2">
                                                    <img src={image} alt={productId.name} className="w-16 h-16 object-cover rounded-lg border" />
                                                    <div>
                                                        <h4 className="text-gray-800 font-medium">{productId.name}</h4>
                                                        <p className="text-gray-500 text-sm">Qty: {quantity} | ₹{price}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div
                    className="flex flex-col justify-center items-center text-center h-[80vh] bg-cover bg-center rounded-lg p-10 relative"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${orderImage})`,
                    }}
                >
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white px-4 py-2 rounded-md">No Orders Yet!</h2>
                        <p className="text-lg text-gray-200 mt-2 mb-5 px-3 py-1 rounded-md">
                            Browse products and place your first order now.
                        </p>
                        <Link to="/product" className="mt-2 px-10 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition">
                            Order Now
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
