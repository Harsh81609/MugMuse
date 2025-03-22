import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL + "/api/payment";

export const orderPayment = async (data) => {
  const response = await axios.post(`${serverUrl}/orders`, data, {
    withCredentials: true,
  });
  return response;
};

export const verifyPayment = async (transactionId) => {
  const response = await axios.post(
    `${serverUrl}/orders/verify`,
    { transactionId },
    {
      withCredentials: true,
    }
  );
  return response;
};