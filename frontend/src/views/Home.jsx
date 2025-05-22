import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Dobrodošao u Fitness App</h1>

      {user ? (
        <div>
          <p>Bok, {user.name}!</p>

          <nav>
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/trainings">Trainings</Link></li>
              <li><Link to="/reservation">Reservation</Link></li>
              <li><Link to="/schedule">Schedule</Link></li>
              <li><Link to="/attendance">Attendance</Link></li>
              {user.role === 'admin' && (
                <>
                  <li><Link to="/admin">Admin Panel</Link></li>
                  <li><Link to="/users">Users</Link></li>
                </>
              )}
              <li><button onClick={logout}>Odjava</button></li>
            </ul>
          </nav>
        </div>
      ) : (
        <div>
          <Link to="/login">Prijava</Link> | <Link to="/register">Registracija</Link>
        </div>
      )}
    </div>
  );
}
