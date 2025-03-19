import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const register = async (data) => {
    const response = await axios.post(`${serverUrl}/api/auth/register`, data, {
        withCredentials: true
    })
    return response;
}

export const login = async (data) => {
    const response = await axios.post(`${serverUrl}/api/auth/login`, data, {
        withCredentials: true
    })
    return response;
}

export const logout = async () => {
    const response = await axios.post(`${serverUrl}/api/auth/logout`,{}, {
        withCredentials: true
    })
    return response;
}

export const forgotPassword = async (data) => {
    const response = await axios.post(`${serverUrl}/api/auth/forgot-password`, data, {
        withCredentials: true
    })
    return response;
}

export const resetPassword = async (token, data) => {
    const response = await axios.post(`${serverUrl}/api/auth/reset-password?token=${token}`, data, {
        withCredentials: true
    })
    return response;
}

export const checkAuth=async()=>{
    const response = await axios.post(`${serverUrl}/api/auth/check-auth`,{},{
        withCredentials:true
    })
    return response;
}