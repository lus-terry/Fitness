const Termin = require('../models/terminModel');

exports.getAll = async (req, res) => {
  try {
    const termini = await Termin.getAll();
    res.json(termini);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const noviTermin = await Termin.create(req.body);
    res.status(201).json(noviTermin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
