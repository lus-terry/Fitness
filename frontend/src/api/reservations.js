import axios from './axios';

export const createReservation = async (id_termina) => {
  const res = await axios.post('/api/reservations', { id_termina });
  return res.data;
};

export const cancelReservation = async (id_termina) => {
  const res = await axios.delete(`/api/reservations/${id_termina}`);
  return res.data;
};

export const getUserReservations = async () => {
  const res = await axios.get('/api/reservations/my-reservations');
  return res.data;
};

export const getTrainerReservations = async () => {
  const res = await axios.get('/api/reservations/trainer-reservations');
  return res.data;
};