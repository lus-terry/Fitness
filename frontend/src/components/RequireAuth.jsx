import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RequireAuth() {
  const navigate = useNavigate();

  return (
    <div>
      <p>Molimo prijavite se za pristup ovoj stranici.</p>
      <button onClick={() => navigate('/login')}>
        Prijavi se
      </button>
    </div>
  );
}
