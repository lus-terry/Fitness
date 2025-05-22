import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminPanel() {
  return (
    <div>
      <h2>Administratorska kontrolna ploča</h2>
      <ul>
        <li><Link to="/users">Upravljanje korisnicima</Link></li>
        <li><Link to="/trainings">Upravljanje treninzima</Link></li>
        <li><Link to="/attendance">Evidencija prisutnosti</Link></li>
      </ul>
    </div>
  );
}
