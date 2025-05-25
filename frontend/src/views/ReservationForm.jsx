import React, { useState } from 'react';
import { createReservation } from '../api/reservations';
import { useAuth } from '../contexts/AuthContext';

export default function ReservationForm() {
  const { user } = useAuth();
  const [id_termina, setIdTermina] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('[FORM] Token u localStorage:', localStorage.getItem('token'));

      await createReservation({ id_termina });
      setStatus('Zahtjev za rezervaciju poslan!');
    } catch (err) {
      console.error(err);
      setStatus('Greška pri slanju zahtjeva.');
    }
  };

  if (!user || user.role !== 'client') {
    return <p>Samo klijenti mogu rezervirati termine.</p>;
  }

  return (
    <div>
      <h2>Rezervacija termina</h2>
      <form onSubmit={handleSubmit}>
        <label>ID termina:
          <input type="number" value={id_termina} onChange={e => setIdTermina(e.target.value)} required />
        </label>
        <button type="submit">Rezerviraj</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}