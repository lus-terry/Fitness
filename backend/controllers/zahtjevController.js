const Zahtjev = require('../models/zahtjevModel');

exports.getAll = async (req, res) => {
  try {
    const zahtjevi = await Zahtjev.getAll();
    res.json(zahtjevi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const noviZahtjev = await Zahtjev.create(req.body);
    res.status(201).json(noviZahtjev);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
