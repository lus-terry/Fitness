const db = require('../db');

exports.getAll = async () => {
  const res = await db.query('SELECT * FROM trening');
  return res.rows;
};

exports.create = async ({ naziv, opis, id_trenera }) => {
  const res = await db.query(
    'INSERT INTO trening (naziv, opis, id_trenera) VALUES ($1, $2, $3) RETURNING *',
    [naziv, opis, id_trenera]
  );
  return res.rows[0];
};
