const db = require('../db');

exports.getAll = async () => {
  const res = await db.query('SELECT * FROM termin');
  return res.rows;
};

exports.create = async (termin) => {
  const { id_trenera, id_treninga, datum, vrijeme_termina, trajanje, mjesto, dostupnost } = termin;
  const res = await db.query(
  `INSERT INTO termin (id_trenera, id_treninga, datum, vrijeme_termina, trajanje, mjesto, dostupnost)
   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
  [id_trenera, id_treninga, datum, vrijeme_termina, `${trajanje} minutes`, mjesto, dostupnost]
);

  return res.rows[0];
};
