const Evidentira = require('../models/evidentira');

exports.getAll = async (req, res) => {
  try {
    const evidencije = await Evidentira.getAll();
    res.json(evidencije);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const novaEvidencija = await Evidentira.create(req.body);
    res.status(201).json(novaEvidencija);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
