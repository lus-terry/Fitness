const db = require('../db');

exports.getAll = async () => {
  const res = await db.query('SELECT * FROM klijent');
  return res.rows;
};

exports.getById = async (id) => {
  const res = await db.query('SELECT * FROM klijent WHERE id_korisnika = $1', [id]);
  return res.rows[0];
};

exports.create = async (klijent) => {
  const { id_korisnika, spol, datum_rodenja, aktivnost, zdravstveni_problemi, lijekovi, fizicka_ogranicenja } = klijent;
  const res = await db.query(
    `INSERT INTO klijent (id_korisnika, spol, datum_rodenja, aktivnost, zdravstveni_problemi, lijekovi, fizicka_ogranicenja)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [id_korisnika, spol, datum_rodenja, aktivnost, zdravstveni_problemi, lijekovi, fizicka_ogranicenja]
  );
  return res.rows[0];
};
