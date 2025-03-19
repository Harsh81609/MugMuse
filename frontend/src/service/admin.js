import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const getStats = async (data) => {
    const response = await axios.post(`${serverUrl}/api/admin/stats`, data, {
        withCredentials: true
    })
    return response;
}

export const registorAdmin = async (data) => {
    const response = await axios.post(`${serverUrl}/api/admin/create-admin`, data, {
        withCredentials: true
    })
    return response;
}