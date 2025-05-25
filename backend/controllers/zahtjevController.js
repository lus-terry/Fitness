const Zahtjev = require("../models/zahtjev");
const db = require("../db");

exports.create = async (req, res) => {
  const id_klijenta = req.user.id_korisnika;
  const id_termina = req.body.id_termina;

  try {
    // validacija
    const terminRes = await db.query(
      `SELECT datum, vrijeme_termina, trajanje, id_trenera 
       FROM termin 
       WHERE id_termina = $1`,
      [id_termina]
    );

    if (terminRes.rows.length === 0) {
      return res.status(404).json({ message: "Termin ne postoji." });
    }

    const { datum, vrijeme_termina, trajanje, id_trenera } = terminRes.rows[0];

    // validacija
    if (id_trenera === id_klijenta) {
      return res.status(403).json({ message: "Trener ne može rezervirati vlastiti termin." });
    }

    const [h, m, s] = vrijeme_termina.split(":").map(Number);
    const vrijemePocetka = new Date(datum);
    vrijemePocetka.setHours(h, m, s || 0, 0);

    const sada = new Date();
    if (vrijemePocetka < sada) {
      return res.status(400).json({ message: "Ne možeš rezervirati termin u prošlosti." });
    }

    // validacija
    const vecPostoji = await db.query(
      `SELECT * FROM zahtjev_za_rezervaciju 
       WHERE id_klijenta = $1 AND id_termina = $2`,
      [id_klijenta, id_termina]
    );

    if (vecPostoji.rows.length > 0) {
      return res.status(409).json({ message: "Već si rezervirao ovaj termin." });
    }

    // validacija
    const terminVecRezerviran = await db.query(
      `SELECT * FROM zahtjev_za_rezervaciju 
       WHERE id_termina = $1 AND status_rezervacije = 'reserved'`,
      [id_termina]
    );

    if (terminVecRezerviran.rows.length > 0) {
      return res.status(409).json({ message: "Ovaj termin je već rezerviran." });
    }

    const zahtjev = await Zahtjev.create({
      id_klijenta,
      id_termina,
      vrijeme_zahtjeva: new Date(),
      status_rezervacije: "reserved",
    });

    res.status(201).json(zahtjev);
  } catch (err) {
    console.error("Greška prilikom rezervacije:", err);
    res.status(500).json({ error: err.message });
  }
};
