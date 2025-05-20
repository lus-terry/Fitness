import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createReservation } from '../api/reservations';
import { useAuth } from '../contexts/AuthContext';

export default function ReservationForm({ trainingId }) {
  const { user } = useAuth();
  const [note, setNote] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReservation({ trainingId, userId: user.id, note });
    navigate('/schedule');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Rezervacija treninga</h3>
      <label>Napomena:</label>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} />
      <button type="submit">Rezerviraj</button>
    </form>
  );
}
