import React from 'react';
import PropTypes from 'prop-types';

export default function TerminModal({
  termin,
  trener = 'Nepoznat',
  onClose = () => {},
  onReserve = () => {},
  onCancel = () => {}
}) {
  if (!termin) return null;

  const handleReserve = () => {
    if (typeof onReserve === 'function') onReserve(termin);
  };

  const handleCancel = () => {
    if (typeof onCancel === 'function') onCancel(termin);
  };

  return (
    <div className="termin-modal-overlay">
      <div className="termin-modal">
        <button className="close-button" onClick={onClose}>×</button>

        <h3>Detalji termina</h3>

        <p><strong>Datum:</strong> {termin.start.toLocaleDateString()}</p>
        <p><strong>Vrijeme:</strong> {termin.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <p><strong>Trajanje:</strong> {Math.round((termin.end - termin.start) / 60000)} minuta</p>
        <p><strong>Trening:</strong> {termin.title.includes('ID null') ? 'Nije definirano' : termin.title}</p>
        <p><strong>Trener:</strong> {trener}</p>

        <div style={{ marginTop: '1rem' }}>
          {termin.rezerviran ? (
            <button onClick={handleCancel} className="cancel-button">
              Otkaži rezervaciju
            </button>
          ) : (
            <button onClick={handleReserve} className="reserve-button">
              Rezerviraj termin
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


TerminModal.propTypes = {
  termin: PropTypes.object,
  trener: PropTypes.string,
  onClose: PropTypes.func,
  onReserve: PropTypes.func,
  onCancel: PropTypes.func
};
