import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const getMe = async () => {
    const response = axios.get(`${serverUrl}/api/user/me`, {
        withCredentials: true
    })
    return response;
}

export const updateUser = async (data) => {
    const response = axios.put(`${serverUrl}/api/user/`, data, {
        withCredentials: true
    })
    return response;
}

export const deleteUser = async () => {
    const response = axios.delete(`${serverUrl}/api/user`, {
        withCredentials: true
    })
    return response;
}