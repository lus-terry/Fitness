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
        mjesto: 'Nije uneseno',  // ili možeš napraviti input i za mjesto
        trajanje: 60,            // ako je fiksno trajanje, ili napravi input
        dostupnost: true,
        id_trenera: 1,           // ako imaš dinamički odabir, zamijeni s vrijednosti iz forme
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
    <div>
      <h1>Rezervacija termina</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Datum:
            <input
              type="date"
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Vrijeme:
            <input
              type="time"
              value={vrijeme}
              onChange={(e) => setVrijeme(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Napomena:
            <textarea
              value={napomena}
              onChange={(e) => setNapomena(e.target.value)}
              placeholder="Upiši napomenu..."
            />
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Rezerviram...' : 'Rezerviraj termin'}
        </button>
      </form>
    </div>
  );
}
