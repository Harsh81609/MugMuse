import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL + "/api/auth";

export const register = async (data) => {
  const response = await axios.post(`${serverUrl}/register`, data, {
    withCredentials: true,
  });
  return response;
};

export const login = async (data) => {
  const response = await axios.post(`${serverUrl}/login`, data, {
    withCredentials: true,
  });
  return response;
};

export const logout = async () => {
  const response = await axios.post(
    `${serverUrl}/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response;
};

export const forgotPassword = async (data) => {
  const response = await axios.post(`${serverUrl}/forgot-password`, data, {
    withCredentials: true,
  });
  return response;
};

export const resetPassword = async (token, data) => {
  const response = await axios.post(
    `${serverUrl}/reset-password?token=${token}`,
    data,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const checkAuth = async () => {
  const response = await axios.post(
    `${serverUrl}/check-auth`,
    {},
    {
      withCredentials: true,
    }
  );
  return response;
};