import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reservations'; // prilagodi URL prema backendu

export const createReservation = async (reservationData) => {
  const response = await axios.post(API_URL, reservationData);
  return response.data;
};

export const getReservationsByUser = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

export const cancelReservation = async (reservationId) => {
  const response = await axios.delete(`${API_URL}/${reservationId}`);
  return response.data;
};

// Dodaj funkciju koju traži view Schedule.jsx
export const getUserReservations = async (userId) => {
  // Ako nema endpointa getUserReservations, možemo mapirati na getReservationsByUser
  return getReservationsByUser(userId);
};
