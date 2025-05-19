const db = require('../db');

exports.getAll = async () => {
  const res = await db.query('SELECT * FROM korisnik');
  return res.rows;
};

exports.getById = async (id) => {
  const res = await db.query('SELECT * FROM korisnik WHERE id_korisnika = $1', [id]);
  return res.rows[0];
};

exports.create = async ({ ime, prezime, email, lozinka, telefon }) => {
  const res = await db.query(
    `INSERT INTO korisnik (ime, prezime, email, lozinka, telefon)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [ime, prezime, email, lozinka, telefon]
  );
  return res.rows[0];
};

exports.delete = async (id) => {
  await db.query('DELETE FROM korisnik WHERE id_korisnika = $1', [id]);
};

exports.update = async (id, fields) => {
  const { ime, prezime, email, lozinka, telefon } = fields;
  const res = await db.query(
    `UPDATE korisnik SET ime=$1, prezime=$2, email=$3, lozinka=$4, telefon=$5
     WHERE id_korisnika = $6 RETURNING *`,
    [ime, prezime, email, lozinka, telefon, id]
  );
  return res.rows[0];
};
