const db = require('../db');

exports.getAll = async () => {
  const res = await db.query('SELECT * FROM trener');
  return res.rows;
};

exports.getById = async (id) => {
  const res = await db.query('SELECT * FROM trener WHERE id_korisnika = $1', [id]);
  return res.rows[0];
};

exports.create = async (trener) => {
  const { id_korisnika, specijalizacija, biografija, certifikat, slika, id_poslovnice } = trener;
  const res = await db.query(
    `INSERT INTO trener (id_korisnika, specijalizacija, biografija, certifikat, slika, id_poslovnice)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [id_korisnika, specijalizacija, biografija, certifikat, slika, id_poslovnice]
  );
  return res.rows[0];
};
