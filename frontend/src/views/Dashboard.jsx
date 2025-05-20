import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RequireAuth from '../components/RequireAuth';


export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if(!user) {
    <RequireAuth/>
  }
  return (
    <div>
      <h2>Dobrodošli, {user.name}</h2>
      <p>Uloga: {user.role}</p>

      {user.role === 'client' && (
        <>
          <Link to="/trainings">Pregled treninga</Link><br />
          <Link to="/schedule">Moje rezervacije</Link>
        </>
      )}

      {user.role === 'trainer' && (
        <>
          <Link to="/schedule">Raspored treninga</Link><br />
          <Link to="/attendance">Evidencija prisutnosti</Link>
        </>
      )}

      {user.role === 'admin' && (
        <>
          <Link to="/admin">Administracija</Link><br />
          <Link to="/users">Upravljanje korisnicima</Link>
        </>
      )}
    </div>
  );
}
