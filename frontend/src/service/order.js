import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL + "/api/order";

export const getOrderDetails = async (orderId) => {
  const response = await axios.get(`${serverUrl}/${orderId}`, {
    withCredentials: true,
  });
  return response;
};

export const getUsersAllOrder = async () => {
  const response = await axios.get(`${serverUrl}/user/orders`, {
    withCredentials: true,
  });
  return response;
};

export const placeOrder = async (data) => {
  const response = await axios.post(`${serverUrl}`, data, {
    withCredentials: true,
  });
  return response;
};

export const updateOrderStatus = async (orderId, data) => {
  const response = await axios.put(`${serverUrl}/${orderId}`, data, {
    withCredentials: true,
  });
  return response;
};

export const deleteOrder = async (orderId) => {
  const response = await axios.delete(`${serverUrl}/${orderId}`, {
    withCredentials: true,
  });
  return response;
};