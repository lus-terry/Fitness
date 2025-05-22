// src/api/reservations.js
import axios from './axios'; // ✅ KORISTI prilagođeni axios s interceptorom

const API_URL = '/api/reservations'; // koristi proxy (nema localhost)

export const createReservation = async (data) => {
  console.log('[createReservation] Šaljem podatke:', data); // ✅ provjera
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const getReservationsByUser = async () => {
  const res = await axios.get(`${API_URL}/my-reservations`);
  return res.data;
};

export const cancelReservation = async (reservationId) => {
  const res = await axios.delete(`${API_URL}/${reservationId}`);
  return res.data;
};

export const getUserReservations = async (userId) => {
  return getReservationsByUser(userId); // funkcionalno isto
};
