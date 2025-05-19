const db = require('../db');

exports.getAll = async () => {
  const res = await db.query('SELECT * FROM evidentira');
  return res.rows;
};

exports.create = async ({ id_klijenta, id_trenera, id_fitness_zapisa }) => {
  const res = await db.query(
    'INSERT INTO evidentira (id_klijenta, id_trenera, id_fitness_zapisa) VALUES ($1, $2, $3) RETURNING *',
    [id_klijenta, id_trenera, id_fitness_zapisa]
  );
  return res.rows[0];
};
