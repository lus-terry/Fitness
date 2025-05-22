import React, { useEffect, useState } from 'react';
import { getUserReservations } from '../api/reservations';
import { useAuth } from '../contexts/AuthContext';

export default function Schedule() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (user) {
      getUserReservations(user.id).then(setReservations);
    }
  }, [user]);

  return (
    <div>
      <h2>Moj raspored</h2>
      {reservations.length === 0 ? (
        <p>Nema rezervacija.</p>
      ) : (
        <ul>
          {reservations.map((res) => (
            <li key={res.id}>
              {res.trainingName} - {new Date(res.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
