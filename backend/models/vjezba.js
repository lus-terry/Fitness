const db = require('../db');

exports.getAll = async () => {
  const res = await db.query('SELECT * FROM vjezba');
  return res.rows;
};

exports.create = async ({ naziv, ponavljanja, serije, uteg }) => {
  const res = await db.query(
    'INSERT INTO vjezba (naziv, ponavljanja, serije, uteg) VALUES ($1, $2, $3, $4) RETURNING *',
    [naziv, ponavljanja, serije, uteg]
  );
  return res.rows[0];
};

exports.getByTreningId = async (id_treninga) => {
  const res = await db.query(`
    SELECT v.*
    FROM vjezba v
    JOIN trening_vjezba tv ON v.id_vjezbe = tv.id_vjezbe
    WHERE tv.id_treninga = $1
  `, [id_treninga]);
  return res.rows;
};
