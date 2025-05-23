// controllers/vjezbaController.js
const db = require('../db');

exports.getAll = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM vjezba');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByTreningId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      `SELECT v.* FROM vjezba v
       JOIN trening_vjezba tv ON v.id_vjezbe = tv.id_vjezbe
       WHERE tv.id_treninga = $1`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { naziv, ponavljanja, serije, uteg } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO vjezba (naziv, ponavljanja, serije, uteg) VALUES ($1, $2, $3, $4) RETURNING *',
      [naziv, ponavljanja, serije, uteg]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { naziv, ponavljanja, serije, uteg } = req.body;
  try {
    const result = await db.query(
      'UPDATE vjezba SET naziv=$1, ponavljanja=$2, serije=$3, uteg=$4 WHERE id_vjezbe=$5 RETURNING *',
      [naziv, ponavljanja, serije, uteg, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
