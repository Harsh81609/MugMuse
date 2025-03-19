import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const getOrderDetails = async (orderId) => {
    const response = await axios.get(`${serverUrl}/api/order/${orderId}`, {
        withCredentials: true
    })
    return response;
}

export const getUsersAllOrder = async () => {
    const response = await axios.get(`${serverUrl}/api/order/user/orders`, {
        withCredentials: true
    })
    console.log("Response from getUsersAllOrder: ",response);
    return response;
}

export const placeOrder = async (data) => {
    const response = await axios.post(`${serverUrl}/api/order`, data, {
        withCredentials: true
    })
    return response;
}

export const updateOrderStatus = async (orderId, data) => {
    const response = await axios.put(`${serverUrl}/api/order/${orderId}`, data, {
        withCredentials: true
    })
    return response;
}

export const deleteOrder = async (orderId) => {
    const response = await axios.delete(`${serverUrl}/api/order/${orderId}`, {
        withCredentials: true
    })
    return response;
}