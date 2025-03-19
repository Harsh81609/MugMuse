import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL+"/api/product";

export const getAllProduct = async () => {
    const response = await axios.get(`${serverUrl}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response;
}

export const getOneProduct = async (productId) => {
    const response = await axios.get(`${serverUrl}/${productId}`, {
        withCredentials: true
    })
    return response;
}

export const createProduct = async (data) => {
    const response = await axios.post(`${serverUrl}`, data, {
        withCredentials: true
    })
    return response;
}

export const updateProduct = async (productId, data) => {
    const response = await axios.put(`${serverUrl}/${productId}`, data, {
        withCredentials: true
    })
    return response;
}

export const deleteProduct = async (productId) => {
    const response = await axios.delete(`${serverUrl}/${productId}`, {
        withCredentials: true
    })
    return response;
}

export const featuredProducts = async () => {
    const response = await axios.get(`${serverUrl}/featured`, {
        withCredentials: true
    });
    return response;
}