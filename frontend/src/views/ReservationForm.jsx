import React, { useState } from 'react';
import axios from 'axios';

export default function ReservationForm() {
  const [datum, setDatum] = useState('');
  const [vrijeme, setVrijeme] = useState('');
  const [napomena, setNapomena] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/termini', {
        datum,
        vrijeme_termina: vrijeme,
        mjesto: 'Nije uneseno',
        trajanje: 60,
        dostupnost: true,
        id_trenera: 1,
        id_treninga: 1,
        napomena,
      });
      alert('Termin uspješno rezerviran!');
      setDatum('');
      setVrijeme('');
      setNapomena('');
    } catch (error) {
      console.error('Greška pri rezervaciji:', error);
      alert('Došlo je do greške.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Rezervacija termina</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Datum:</label>
          <input type="date" value={datum} onChange={(e) => setDatum(e.target.value)} required />
        </div>

        <div>
          <label>Vrijeme:</label>
          <input type="time" value={vrijeme} onChange={(e) => setVrijeme(e.target.value)} required />
        </div>

        <div>
          <label>Napomena:</label>
          <textarea value={napomena} onChange={(e) => setNapomena(e.target.value)} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Rezerviram...' : 'Rezerviraj termin'}
        </button>
      </form>
    </div>
  );
}

