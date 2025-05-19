const FitnessZapis = require('../models/fitnessZapisModel');

exports.getAll = async (req, res) => {
  try {
    const zapisi = await FitnessZapis.getAll();
    res.json(zapisi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const noviZapis = await FitnessZapis.create(req.body);
    res.status(201).json(noviZapis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
