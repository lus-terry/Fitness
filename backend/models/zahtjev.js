const db = require('../db');

exports.getAll = async () => {
  const res = await db.query('SELECT * FROM zahtjev_za_rezervaciju');
  return res.rows;
};

exports.create = async ({ id_klijenta, id_termina, vrijeme_zahtjeva, status_rezervacije }) => {
  const res = await db.query(
    'INSERT INTO zahtjev_za_rezervaciju (id_klijenta, id_termina, vrijeme_zahtjeva, status_rezervacije) VALUES ($1, $2, $3, $4) RETURNING *',
    [id_klijenta, id_termina, vrijeme_zahtjeva, status_rezervacije]
  );
  return res.rows[0];
};
