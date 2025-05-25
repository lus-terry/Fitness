const Trening = require("../models/trening");

exports.getAll = async (req, res) => {
  try {
    const treninzi = await Trening.getAll();
    res.json(treninzi);
  } catch (err) {
    console.error("[treningController]  Greška pri dohvaćanju treninga:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { naziv, opis, id_trenera } = req.body;

  if (id_trenera !== req.user?.id_korisnika) {
    console.warn(
      "[treningController]  ID trenera iz bodyja NE odgovara prijavljenom korisniku"
    );
    return res
      .status(403)
      .json({ message: "Nedozvoljeno – ID trenera nije vaš." });
  }

  try {
    const noviTrening = await Trening.create({ naziv, opis, id_trenera });
    res.status(201).json(noviTrening);
  } catch (err) {
    console.error(
      "[treningController]  Greška prilikom unosa treninga:",
      err.message
    );
    res.status(500).json({ error: err.message });
  }
};
