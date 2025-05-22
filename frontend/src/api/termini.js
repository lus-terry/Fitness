
// src/api/termini.js
import axios from './axios'; // ⚠️ bitno: koristi ./axios, ne 'axios'

export const createTermin = async (data) => {
  const response = await axios.post('/termini', data);
  return response.data;
};
