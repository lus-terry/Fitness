import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prezime: '',
    email: '',
    password: '',
    telefon: '',
    role: 'client', // default
    // klijent polja
    datum_rodenja: '',
    aktivnost: '',
    spol: '',
    zdravstveni_problemi: '',
    lijekovi: '',
    fizicka_ogranicenja: '',
    // trener polja
    specijalizacija: '',
    biografija: '',
    certifikat: '',
    slika: '',
    id_poslovnice: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registracija</h2>

      <input name="name" placeholder="Ime" onChange={handleChange} required />
      <input name="prezime" placeholder="Prezime" onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
      <input name="password" placeholder="Lozinka" type="password" onChange={handleChange} required />
      <input name="telefon" placeholder="Telefon" onChange={handleChange} />

      <label>Uloga:</label>
      <select name="role" onChange={handleChange}>
        <option value="client">Klijent</option>
        <option value="trainer">Trener</option>
      </select>

      {/* Polja za klijenta */}
      {form.role === 'client' && (
        <>
          <label>Datum rođenja:</label>
          <input name="datum_rodenja" type="date" onChange={handleChange} required />

          <label>Spol:</label>
          <select name="spol" onChange={handleChange}>
            <option value="">Odaberi</option>
            <option value="M">Muški</option>
            <option value="Ž">Ženski</option>
            <option value="Drugo">Drugo</option>
          </select>

          <input name="aktivnost" placeholder="Aktivnost (npr. 3x tjedno)" onChange={handleChange} required />
          <input name="zdravstveni_problemi" placeholder="Zdravstveni problemi (odvojeni zarezom)" onChange={handleChange} />
          <input name="lijekovi" placeholder="Lijekovi (odvojeni zarezom)" onChange={handleChange} />
          <input name="fizicka_ogranicenja" placeholder="Fizička ograničenja (odvojena zarezom)" onChange={handleChange} />
        </>
      )}

      {/* Polja za trenera */}
      {form.role === 'trainer' && (
        <>
          <input name="specijalizacija" placeholder="Specijalizacija" onChange={handleChange} required />
          <input name="biografija" placeholder="Biografija" onChange={handleChange} />
          <input name="certifikat" placeholder="Certifikat" onChange={handleChange} />
          <input name="slika" placeholder="URL slike" onChange={handleChange} />
          <input name="id_poslovnice" placeholder="ID poslovnice (broj)" type="number" onChange={handleChange} />
        </>
      )}

      <button type="submit">Registriraj se</button>
    </form>
  );
}
