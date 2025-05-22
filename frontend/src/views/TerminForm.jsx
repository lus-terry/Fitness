import React, { useState } from 'react';
import { createTermin } from '../api/termini';
import { useAuth } from '../contexts/AuthContext';

export default function TerminForm() {
  const { user } = useAuth(); // Trener mora biti ulogiran

  const [form, setForm] = useState({
    id_treninga: '',
    datum: '',
    vrijeme_termina: '',
    trajanje: '',
    mjesto: '',
    dostupnost: '',
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const terminZaSlanje = {
        ...form,
        id_trenera: user.id_korisnika,
        id_treninga: parseInt(form.id_treninga),
        trajanje: parseInt(form.trajanje),
        dostupnost: parseInt(form.dostupnost),
      };

      await createTermin(terminZaSlanje);
      setStatus('✅ Termin uspješno dodan.');
      setForm({
        id_treninga: '',
        datum: '',
        vrijeme_termina: '',
        trajanje: '',
        mjesto: '',
        dostupnost: '',
      });
    } catch (error) {
      console.error(error);
      setStatus('❌ Greška pri unosu termina.');
      console.log('Greška:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'trainer') {
    return <p style={{ color: 'red' }}>Samo treneri mogu dodavati termine.</p>;
  }

  return (
    <div>
      <h2>Dodaj novi termin</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="id_treninga"
          placeholder="ID treninga"
          type="number"
          value={form.id_treninga}
          onChange={handleChange}
          required
        />
        <input
          name="datum"
          type="date"
          value={form.datum}
          onChange={handleChange}
          required
        />
        <input
          name="vrijeme_termina"
          type="time"
          value={form.vrijeme_termina}
          onChange={handleChange}
          required
        />
        <input
          name="trajanje"
          type="number"
          placeholder="Trajanje (u minutama)"
          value={form.trajanje}
          onChange={handleChange}
          required
        />
        <input
          name="mjesto"
          placeholder="Mjesto održavanja"
          value={form.mjesto}
          onChange={handleChange}
          required
        />
        <input
          name="dostupnost"
          type="number"
          placeholder="Broj slobodnih mjesta"
          value={form.dostupnost}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Dodavanje...' : 'Dodaj termin'}
        </button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
}
