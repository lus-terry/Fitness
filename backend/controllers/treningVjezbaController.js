// controllers/treningVjezbaController.js
const db = require('../db');

exports.linkExerciseToTraining = async (req, res) => {
  const { id_treninga, id_vjezbe } = req.body;

  if (!id_treninga || !id_vjezbe) {
    return res.status(400).json({ error: 'Nedostaje id_treninga ili id_vjezbe' });
  }

  try {
    await db.query(
      `INSERT INTO trening_vjezba (id_treninga, id_vjezbe)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [id_treninga, id_vjezbe]
    );
    res.status(201).json({ message: 'Vježba je uspješno povezana s treningom.' });
  } catch (err) {
    console.error('[treningVjezbaController] Greška:', err.message);
    res.status(500).json({ error: 'Greška na serveru.' });
  }
};