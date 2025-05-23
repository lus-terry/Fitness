import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrenerDropdown = ({ onSelect }) => {
  const [treneri, setTreneri] = useState([]);

  useEffect(() => {
    axios.get('/treneri')
      .then((res) => setTreneri(res.data))
      .catch((err) => console.error('Greška pri dohvaćanju trenera:', err));
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <label htmlFor="trener-select">Odaberi trenera:</label>
      <select
        id="trener-select"
        onChange={(e) => onSelect(parseInt(e.target.value))}
        defaultValue=""
      >
        <option value="" disabled>-- Trener --</option>
        {treneri.map((trener) => (
          <option key={trener.id_korisnika} value={trener.id_korisnika}>
            {trener.ime} {trener.prezime}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TrenerDropdown;
