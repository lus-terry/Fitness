const db = require('../db');

exports.create = async ({ id_klijenta, id_termina, vrijeme_zahtjeva, status_rezervacije }) => {
  const res = await db.query(
    `INSERT INTO zahtjev_za_rezervaciju (id_klijenta, id_termina, vrijeme_zahtjeva, status_rezervacije)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [id_klijenta, id_termina, vrijeme_zahtjeva, status_rezervacije]
  );
  return res.rows[0];
};

exports.getByUserId = async (id_klijenta) => {
  const res = await db.query(
    'SELECT * FROM zahtjev_za_rezervaciju WHERE id_klijenta = $1',
    [id_klijenta]
  );
  return res.rows;
};