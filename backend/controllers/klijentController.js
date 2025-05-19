const Klijent = require('../models/klijentModel');

exports.getAll = async (req, res) => {
  try {
    const klijenti = await Klijent.getAll();
    res.json(klijenti);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const klijent = await Klijent.getById(req.params.id);
    if (klijent) res.json(klijent);
    else res.status(404).json({ error: 'Klijent nije pronađen' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newKlijent = await Klijent.create(req.body);
    res.status(201).json(newKlijent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
