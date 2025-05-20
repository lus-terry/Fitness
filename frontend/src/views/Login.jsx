import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { login as apiLogin } from '../api/auth';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await apiLogin({ email, password });
      login(user); // poziva login iz AuthContexta
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login nije uspio: ' + (error.message || 'Greška na serveru.'));
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email: <input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label><br />
        <label>Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label><br />
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
}
