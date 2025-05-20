import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'client' });
  const navigate = useNavigate();

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
      <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
      <input name="password" placeholder="Lozinka" type="password" onChange={handleChange} required />
      <select name="role" onChange={handleChange}>
        <option value="client">Klijent</option>
        <option value="trainer">Trener</option>
      </select>
      <button type="submit">Registriraj se</button>
    </form>
  );
}
