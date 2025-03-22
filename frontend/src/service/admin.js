import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL + "/api/admin";

export const getStats = async (data) => {
  const response = await axios.post(`${serverUrl}/stats`, data, {
    withCredentials: true,
  });
  return response;
};

export const registorAdmin = async (data) => {
  const reponse = await axios.post(`${serverUrl}/create-admin`, data, {
    withCredentials: true,
  });
  return response;
};