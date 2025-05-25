import axios from "axios";

const API_URL = "/api/auth";

export const login = async ({ email, password }) => {
  const response = await axios.post("/api/auth/login", { email, password });
  const { user, token } = response.data;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
  return user;
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data.user;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`);
    return response.data.user;
  } catch (error) {
    return null;
  }
};
