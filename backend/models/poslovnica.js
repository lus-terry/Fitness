const db = require('../db');

exports.getAll = async () => {
  const res = await db.query('SELECT * FROM poslovnica');
  return res.rows;
};

exports.create = async ({ naziv, lokacija }) => {
  const res = await db.query(
    'INSERT INTO poslovnica (naziv, lokacija) VALUES ($1, $2) RETURNING *',
    [naziv, lokacija]
  );
  return res.rows[0];
};
