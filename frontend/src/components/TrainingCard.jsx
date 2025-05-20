import React from 'react';

const TrainingCard = ({ training, onClick }) => {
  return (
    <div onClick={() => onClick && onClick(training)}>
      <h3>{training.name}</h3>
      <p>Vrsta: {training.type}</p>
      <p>Trener: {training.trainerName}</p>
      <p>Datum i vrijeme: {new Date(training.date).toLocaleString()}</p>
      <p>Kapacitet: {training.capacity}</p>
      <p>Popunjeno: {training.reservedCount}</p>
      {training.notes && <p>Napomene: {training.notes}</p>}
    </div>
  );
};

export default TrainingCard;
