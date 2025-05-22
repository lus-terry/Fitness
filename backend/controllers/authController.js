const db = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // ako koristiš .env


exports.register = async (req, res) => {
  const {
    name,
    prezime,
    email,
    password,
    telefon,
    role,
    // klijent
    datum_rodenja,
    spol,
    aktivnost,
    zdravstveni_problemi,
    lijekovi,
    fizicka_ogranicenja,
    // trener
    specijalizacija,
    biografija,
    certifikat,
    slika,
    id_poslovnice
  } = req.body;

  try {
    // 1. Dodaj korisnika
    const korisnikRes = await db.query(
      'INSERT INTO korisnik (ime, prezime, email, lozinka, telefon) VALUES ($1, $2, $3, $4, $5) RETURNING id_korisnika',
      [name, prezime, email, password, telefon || null]
    );

    const korisnikId = korisnikRes.rows[0].id_korisnika;

    // 2. Ako je klijent
    if (role === 'client') {
      await db.query(
        `INSERT INTO klijent (
          id_korisnika, spol, datum_rodenja, aktivnost,
          zdravstveni_problemi, lijekovi, fizicka_ogranicenja
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          korisnikId,
          spol || null,
          datum_rodenja,
          aktivnost,
          zdravstveni_problemi?.split(',').map(e => e.trim()) || null,
          lijekovi?.split(',').map(e => e.trim()) || null,
          fizicka_ogranicenja?.split(',').map(e => e.trim()) || null
        ]
      );
    }

    // 3. Ako je trener
    if (role === 'trainer') {
      await db.query(
        `INSERT INTO trener (
          id_korisnika, specijalizacija, biografija,
          certifikat, slika, id_poslovnice
        ) VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          korisnikId,
          specijalizacija,
          biografija || null,
          certifikat || null,
          slika || null,
          id_poslovnice || null
        ]
      );
    }

    res.status(201).json({
      message: 'Uspješno registriran korisnik',
      user: { id_korisnika: korisnikId, role }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška pri registraciji' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Nađi korisnika
    const result = await db.query('SELECT * FROM korisnik WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Neispravan email ili lozinka' });
    }

    const korisnik = result.rows[0];

    // 2. Provjeri lozinku (napomena: bez hashiranja zasad)
    if (korisnik.lozinka !== password) {
      return res.status(401).json({ message: 'Neispravan email ili lozinka' });
    }

    // 3. Odredi ulogu
    let role = null;

const klijent = await db.query('SELECT 1 FROM klijent WHERE id_korisnika = $1', [korisnik.id_korisnika]);
if (klijent.rows.length > 0) role = 'client';

const trener = await db.query('SELECT 1 FROM trener WHERE id_korisnika = $1', [korisnik.id_korisnika]);
if (trener.rows.length > 0) role = 'trainer';

if (!role) {
  return res.status(403).json({ message: 'Korisnik nema definiranu ulogu.' });
}

    // 4. Priprema korisnika za token
    const userPayload = {
      id_korisnika: korisnik.id_korisnika,
      ime: korisnik.ime,
      prezime: korisnik.prezime,
      email: korisnik.email,
      role
    };

    // 5. Generiraj JWT token
    const token = jwt.sign(userPayload, process.env.JWT_SECRET || 'tajna', { expiresIn: '1h' });

    // 6. Pošalji korisnika + token
    res.status(200).json({
      message: 'Login uspješan',
      user: userPayload,
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška pri loginu' });
  }
};

