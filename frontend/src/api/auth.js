import axios from 'axios';

const API_URL = '/api/auth';

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    // Backend bi trebao vratiti user podatke i token (npr. JWT)
    // Token se može pohraniti u localStorage ili cookie (nije ovdje implementirano)
    return response.data.user;
  } catch (error) {
    throw error.response?.data || error;
  }
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
    // Backend može brisati sesiju ili token
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`);
    return response.data.user;
  } catch (error) {
    return null; // ako korisnik nije logiran, vrati null
  }
};
