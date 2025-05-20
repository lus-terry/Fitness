const Trener = require('../models/trener');

exports.getAll = async (req, res) => {
  try {
    const treneri = await Trener.getAll();
    res.json(treneri);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const trener = await Trener.getById(req.params.id);
    if (trener) res.json(trener);
    else res.status(404).json({ error: 'Trener nije pronađen' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newTrener = await Trener.create(req.body);
    res.status(201).json(newTrener);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
