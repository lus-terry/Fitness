const Trainer = require('../models/Trainer');

exports.getAllTrainers = async (req, res) => {
  const trainers = await Trainer.find();
  res.json(trainers);
};
