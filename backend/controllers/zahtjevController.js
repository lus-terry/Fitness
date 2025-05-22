const Zahtjev = require('../models/zahtjev');

exports.create = async (req, res) => {
  try {
    console.log('[zahtjevController] Pozvana funkcija create');
    console.log('[zahtjevController] req.user:', req.user);
    console.log('[zahtjevController] req.body:', req.body);

    const zahtjev = await Zahtjev.create({
      id_klijenta: req.user.id_korisnika,
      id_termina: req.body.id_termina,
      vrijeme_zahtjeva: new Date(),
      status_rezervacije: 'pending'
    });
    res.status(201).json(zahtjev);
  } catch (err) {
    console.error('[zahtjevController] Greška:', err.message);
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