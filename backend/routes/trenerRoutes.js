const express = require('express');
const router = express.Router();
const db = require('../db'); // pretpostavljam da koristiš pg

// Dohvati sve trenere s njihovim korisničkim podacima
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT k.id_korisnika, k.ime, k.prezime
      FROM Trener t
      JOIN Korisnik k ON t.id_korisnika = k.id_korisnika
    `);
    console.log('[GET /treneri] Dohvaćeni treneri:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('[GET /treneri] Greška:', err.message);
    res.status(500).json({ error: 'Greška pri dohvaćanju trenera.' });
  }
});

module.exports = router;

