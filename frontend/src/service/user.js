import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL + "/api/user";

export const getMe = async () => {
    const response = await axios.get(`${serverUrl}/me`, {
        withCredentials:true
    })
    return response;
}

export const updateUser=async (data) => {
    const response = await axios.put(`${serverUrl}`, data, {
        withCredentials:true
    })
    return response;
}

export const deleteUser=async () => {
    const response = await axios.delete(`${serverUrl}`, {
        withCredentials:true
    })
    return response;
}