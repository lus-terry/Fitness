import React, { useEffect, useState } from 'react';
import { getAllTrainings } from '../api/trainings';
import TrainingCard from '../components/TrainingCard';

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    getAllTrainings().then(setTrainings);
  }, []);

  return (
    <div>
      <h2>Dostupni treninzi</h2>
      {trainings.map((training) => (
        <TrainingCard key={training.id} training={training} />
      ))}
    </div>
  );
}
