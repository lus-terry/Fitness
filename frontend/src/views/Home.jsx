import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>Dobrodošao u Fitness App</h1>

      {user ? (
        <div>
          <p>Bok, {user.name}!</p>
          <Navbar />
        </div>
      ) : (
        <div>
          <Link to="/login">Prijava</Link> | <Link to="/register">Registracija</Link>
        </div>
      )}
    </div>
  );
}

