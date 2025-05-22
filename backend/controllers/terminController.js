const Termin = require('../models/termin');

exports.getAll = async (req, res) => {
  try {
    const termini = await Termin.getAll();
    res.json(termini);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  console.log('[terminController] POKRENUTO STVARANJE TERMINA');

  console.log('[terminController] req.user:', req.user);
  console.log('[terminController] req.body:', req.body);

  if (req.body.id_trenera !== req.user.id_korisnika) {
    console.warn('[terminController] ❌ ID trenera iz bodyja NE ODGOVARA prijavljenom korisniku!');
    return res.status(403).json({ message: 'Nedozvoljeno – ID trenera nije vaš.' });
  } else {
    console.log('[terminController] ✅ ID trenera odgovara prijavljenom korisniku.');
  }

  try {
    const noviTermin = await Termin.create(req.body);
    res.status(201).json(noviTermin);
  } catch (err) {
    console.error('[terminController] ❌ Greška prilikom unosa termina:', err.message);
    res.status(500).json({ error: err.message });
  }
};
