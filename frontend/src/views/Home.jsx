import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Schedule from './Schedule';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container">
      

      {user ? (
        <div>
          
          <Navbar />
          <div style={{ width: '90%', margin: '0 auto' }}>
  
      <Schedule />
    </div>
   

        </div>
      ) : (
        <div>
          <Link to="/login">Prijava</Link> | <Link to="/register">Registracija</Link>
        </div>
      )}
    </div>
  );
}

