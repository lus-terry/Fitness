const Zahtjev = require('../models/zahtjev');
const db = require('../db');


exports.create = async (req, res) => {
  try {
    const zahtjev = await Zahtjev.create({
      id_klijenta: req.user.id_korisnika,
      id_termina: req.body.id_termina,
      vrijeme_zahtjeva: new Date(),
      status_rezervacije: 'reserved'
    });
    res.status(201).json(zahtjev);
  } catch (err) {
    console.error('❌ Greška prilikom rezervacije:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMyReservations = async (req, res) => {
  try {
    const zahtjevi = await Zahtjev.getByUserId(req.user.id_korisnika);
    res.json(zahtjevi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancel = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id_korisnika;

  console.log('[cancelReservation] Termin ID:', id);
  console.log('[cancelReservation] Korisnik ID:', userId);

  try {
    const result = await db.query(
      'DELETE FROM zahtjev_za_rezervaciju WHERE id_termina = $1 AND id_klijenta = $2 RETURNING *',
      [id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Rezervacija nije pronađena ili ne pripada korisniku.' });
    }

    res.json({ message: 'Rezervacija otkazana.' });
  } catch (err) {
    console.error('[cancelReservation] ❌ Greška:', err.message);
    res.status(500).json({ error: 'Greška pri otkazivanju rezervacije.' });
  }
};

// Dohvati sve zahtjeve za trenere – njihovi termini i klijenti
exports.getReservationsForTrainer = async (req, res) => {
  const trenerId = req.user.id_korisnika;

  try {
    const result = await db.query(`
      SELECT z.id_termina, z.status_rezervacije, k.ime, k.prezime
      FROM zahtjev_za_rezervaciju z
      JOIN termin t ON z.id_termina = t.id_termina
      JOIN klijent kl ON z.id_klijenta = kl.id_korisnika
      JOIN korisnik k ON k.id_korisnika = kl.id_korisnika
      WHERE t.id_trenera = $1 AND z.status_rezervacije = 'reserved'
    `, [trenerId]);

    res.json(result.rows);
  } catch (err) {
    console.error('[getReservationsForTrainer] Greška:', err.message);
    res.status(500).json({ error: 'Greška pri dohvaćanju rezervacija.' });
  }
};
