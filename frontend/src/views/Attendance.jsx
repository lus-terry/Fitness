import React, { useEffect, useState } from 'react';
import { getTrainerTrainings, markAttendance } from '../api/trainings';
import { useAuth } from '../contexts/AuthContext';

export default function Attendance() {
  const { user } = useAuth();
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    if (user?.role === 'trainer') {
      getTrainerTrainings(user.id).then(setTrainings);
    }
  }, [user]);

  const handleMark = async (trainingId, clientId) => {
    await markAttendance(trainingId, clientId);
    alert('Prisutnost označena!');
  };

  return (
    <div>
      <h2>Označavanje prisutnosti</h2>
      {trainings.map((training) => (
        <div key={training.id}>
          <h4>{training.name} ({training.date})</h4>
          <ul>
            {training.clients.map((client) => (
              <li key={client.id}>
                {client.name}
                <button onClick={() => handleMark(training.id, client.id)}>Označi prisutnost</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
