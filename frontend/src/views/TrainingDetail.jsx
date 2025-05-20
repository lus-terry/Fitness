import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTrainingById } from '../api/trainings';
import ReservationForm from './ReservationForm';

export default function TrainingDetail() {
  const { id } = useParams();
  const [training, setTraining] = useState(null);

  useEffect(() => {
    getTrainingById(id).then(setTraining);
  }, [id]);

  if (!training) return <p>Učitavanje...</p>;

  return (
    <div>
      <h2>{training.name}</h2>
      <p>Vrsta: {training.type}</p>
      <p>Trener: {training.trainerName}</p>
      <p>Kapacitet: {training.capacity}</p>
      <p>Opis: {training.description}</p>

      <ReservationForm trainingId={training.id} />
    </div>
  );
}
