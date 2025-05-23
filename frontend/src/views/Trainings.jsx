import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TreninziPage() {
  const [treninzi, setTreninzi] = useState([]);
  const [odabraniTrening, setOdabraniTrening] = useState(null);
  const [termini, setTermini] = useState([]);

  const [noviTermin, setNoviTermin] = useState({
    datum: '',
    vrijeme_termina: '',
    trajanje: '',
    mjesto: ''
  });

  useEffect(() => {
    axios.get('/treninzi')
      .then(res => setTreninzi(res.data))
      .catch(err => console.error('Greška pri dohvaćanju treninga:', err));
  }, []);

  useEffect(() => {
    if (!odabraniTrening) return;
    axios.get(`/termini?trening=${odabraniTrening}`)
      .then(res => setTermini(res.data))
      .catch(err => console.error('Greška pri dohvaćanju termina:', err));
  }, [odabraniTrening]);

  const handleInputChange = (e) => {
    setNoviTermin({ ...noviTermin, [e.target.name]: e.target.value });
  };

  const handleAddTermin = async (e) => {
    e.preventDefault();
    try {
      const termin = {
        ...noviTermin,
        id_treninga: parseInt(odabraniTrening),
        trajanje: parseInt(noviTermin.trajanje),
        dostupnost: 'available'
      };
      await axios.post('/termini', termin);
      setNoviTermin({ datum: '', vrijeme_termina: '', trajanje: '', mjesto: '' });
      const refreshed = await axios.get(`/termini?trening=${odabraniTrening}`);
      setTermini(refreshed.data);
    } catch (err) {
      console.error('Greška prilikom dodavanja termina:', err);
    }
  };

  return (
    <div className="p-4">
      <h2>Treninzi i njihovi termini</h2>

      <label>Odaberi trening:</label>
      <select onChange={(e) => setOdabraniTrening(e.target.value)} defaultValue="">
        <option value="">-- Odaberi trening --</option>
        {treninzi.map(t => (
          <option key={t.id_treninga} value={t.id_treninga}>{t.naziv}</option>
        ))}
      </select>

      {odabraniTrening && (
        <>
          <h3>Termini za trening #{odabraniTrening}</h3>
          <table>
            <thead>
              <tr>
                <th>Datum</th>
                <th>Vrijeme</th>
                <th>Trajanje</th>
                <th>Mjesto</th>
              </tr>
            </thead>
            <tbody>
              {termini.map(t => (
                <tr key={t.id_termina}>
                  <td>{t.datum}</td>
                  <td>{t.vrijeme_termina}</td>
                  <td>{t.trajanje} min</td>
                  <td>{t.mjesto}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Dodaj novi termin</h4>
          <form onSubmit={handleAddTermin}>
            <input type="date" name="datum" value={noviTermin.datum} onChange={handleInputChange} required />
            <input type="time" name="vrijeme_termina" value={noviTermin.vrijeme_termina} onChange={handleInputChange} required />
            <input type="number" name="trajanje" placeholder="Trajanje (min)" value={noviTermin.trajanje} onChange={handleInputChange} required />
            <input name="mjesto" placeholder="Mjesto" value={noviTermin.mjesto} onChange={handleInputChange} required />
            <button type="submit">Dodaj termin</button>
          </form>
        </>
      )}
    </div>
  );
}
