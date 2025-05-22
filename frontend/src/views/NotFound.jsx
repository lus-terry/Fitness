import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h2>404 - Stranica nije pronađena</h2>
      <p>Stranica koju tražiš ne postoji.</p>
      <Link to="/">Povratak na početnu</Link>
    </div>
  );
}
