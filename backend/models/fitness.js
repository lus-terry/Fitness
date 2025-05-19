const db = require('../db');

exports.getAll = async () => {
  const res = await db.query('SELECT * FROM fitness_zapis');
  return res.rows;
};

exports.create = async (zapis) => {
  const { id_klijenta, visina, tezina, bmi, kondicija, cilj, napomena, vrijeme_zapisa } = zapis;
  const res = await db.query(
    `INSERT INTO fitness_zapis (id_klijenta, visina, tezina, bmi, kondicija, cilj, napomena, vrijeme_zapisa)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [id_klijenta, visina, tezina, bmi, kondicija, cilj, napomena, vrijeme_zapisa]
  );
  return res.rows[0];
};
