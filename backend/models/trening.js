const db = require('../db');

exports.getAll = async () => {
  const res = await db.query('SELECT * FROM trening');
  return res.rows;
};

exports.create = async ({ naziv, plan, id_trenera }) => {
  const res = await db.query(
    'INSERT INTO trening (naziv, plan, id_trenera) VALUES ($1, $2, $3) RETURNING *',
    [naziv, plan, id_trenera]
  );
  return res.rows[0];
};
