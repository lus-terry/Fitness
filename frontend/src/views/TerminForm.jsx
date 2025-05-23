import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import VjezbeDetailSection from '../components/VjezbaDetailSection';

const TerminForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [treninzi, setTreninzi] = useState([]);
  const [termin, setTermin] = useState({
    datum: '',
    vrijeme_termina: '',
    trajanje: '',
    id_treninga: '',
    mjesto: ''
  });

  useEffect(() => {
    const fetchTreninzi = async () => {
      const res = await axios.get('/treninzi');
      setTreninzi(res.data);
    };
    fetchTreninzi();
  }, []);

  const handleChange = (e) => {
    setTermin({ ...termin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...termin,
        id_trenera: user.id_korisnika,
        trajanje: parseInt(termin.trajanje),
        dostupnost: 'available'
      };
      await axios.post('/termini', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Termin uspješno dodan!');
      navigate('/');
    } catch (err) {
      console.error('❌ Greška prilikom dodavanja termina:', err);
      alert('Greška prilikom dodavanja.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto border rounded-xl shadow bg-white text-center">
      <h2 className="text-2xl font-bold mb-6">Unos novog termina</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-left">Datum:</label>
          <input
            type="date"
            name="datum"
            value={termin.datum}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-left">Vrijeme:</label>
          <input
            type="time"
            name="vrijeme_termina"
            value={termin.vrijeme_termina}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-left">Trajanje (min):</label>
          <input
            type="number"
            name="trajanje"
            value={termin.trajanje}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-left">Lokacija (mjesto):</label>
          <input
            type="text"
            name="mjesto"
            value={termin.mjesto}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-left">Trening:</label>
          <select
            name="id_treninga"
            value={termin.id_treninga}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">-- Odaberi trening --</option>
            {treninzi.map((t) => (
              <option key={t.id_treninga} value={t.id_treninga}>
                {t.naziv}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Dodaj termin
          </button>
        </div>
      </form>

      {termin.id_treninga && (
        <VjezbeDetailSection idTreninga={termin.id_treninga} />
      )}
    </div>
  );
};

export default TerminForm;
