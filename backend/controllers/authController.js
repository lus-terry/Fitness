const db = require('../db');

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
    // Pronađi korisnika po emailu
    const result = await db.query(
      'SELECT * FROM korisnik WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Neispravan email ili lozinka' });
    }

    const korisnik = result.rows[0];

    // U stvarnosti bi ovdje usporedio hashirane lozinke!
    if (korisnik.lozinka !== password) {
      return res.status(401).json({ message: 'Neispravan email ili lozinka' });
    }

    // Dohvati ulogu (klijent, trener, admin)
    let role = 'admin'; // default ako nije ni klijent ni trener

    const klijentCheck = await db.query(
      'SELECT 1 FROM klijent WHERE id_korisnika = $1',
      [korisnik.id_korisnika]
    );
    if (klijentCheck.rows.length > 0) role = 'client';

    const trenerCheck = await db.query(
      'SELECT 1 FROM trener WHERE id_korisnika = $1',
      [korisnik.id_korisnika]
    );
    if (trenerCheck.rows.length > 0) role = 'trainer';

    res.status(200).json({
      message: 'Login uspješan',
      user: {
        id_korisnika: korisnik.id_korisnika,
        ime: korisnik.ime,
        prezime: korisnik.prezime,
        email: korisnik.email,
        role: role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška pri loginu' });
  }
};

