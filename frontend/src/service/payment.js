import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const orderPayment = async (data) => {
    const response = await axios.post(`${serverUrl}/api/payment/orders`, data, {
        withCredentials: true
    })
    return response;
}

export const verifyPayment = async (transactionId) => {
    const response = await axios.post(`${serverUrl}/api/payment/orders/verify`, {transactionId}, {
        withCredentials: true
    })
    return response;
}