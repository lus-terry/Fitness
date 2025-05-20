import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Dobrodošli u Fitness Rezervacijski Sustav</h1>
      <p>Rezervirajte treninge brzo i jednostavno.</p>
      <div>
        <Link to="/login"><button>Prijava</button></Link>
        <Link to="/register"><button>Registracija</button></Link>
      </div>
    </div>
  );
}
