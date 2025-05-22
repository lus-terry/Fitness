import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RequireAuth from '../components/RequireAuth';


export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <RequireAuth />;

  return (
    <div className="container">
      <h2>Dobrodošli, {user.name}</h2>
      <p>Uloga: {user.role}</p>

      <ul>
        {user.role === 'client' && (
          <>
            <li><Link to="/trainings">Pregled treninga</Link></li>
            <li><Link to="/schedule">Moje rezervacije</Link></li>
          </>
        )}

        {user.role === 'trainer' && (
          <>
            <li><Link to="/schedule">Raspored treninga</Link></li>
            <li><Link to="/attendance">Evidencija prisutnosti</Link></li>
          </>
        )}

        {user.role === 'admin' && (
          <>
            <li><Link to="/admin">Administracija</Link></li>
            <li><Link to="/users">Upravljanje korisnicima</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}

