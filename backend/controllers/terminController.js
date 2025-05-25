const Termin = require("../models/termin");
const db = require("../db");

exports.getAll = async (req, res) => {
  try {
    const termini = await Termin.getAll();
    res.json(termini);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  console.log("[terminController] POKRENUTO STVARANJE TERMINA");

  console.log("[terminController] req.user:", req.user);
  console.log("[terminController] req.body:", req.body);

  if (req.body.id_trenera !== req.user.id_korisnika) {
    console.warn("[terminController]  ID trenera iz bodyja NE ODGOVARA prijavljenom korisniku!");
    return res.status(403).json({ message: "Nedozvoljeno jer ID trenera nije vaš." });
  } else {
    console.log("[terminController]  ID trenera odgovara prijavljenom korisniku.");
  }

  // validacija
  const { datum, vrijeme_termina, trajanje, id_trenera } = req.body;
  const trajanjeMin = parseInt(trajanje, 10);
  if (isNaN(trajanjeMin) || trajanjeMin <= 0) {
    return res.status(400).json({ message: "Trajanje mora biti pozitivan broj." });
  }

  // validacija
  if (trajanjeMin > 120) {
    return res.status(400).json({ message: "Trajanje termina ne smije biti duže od 120 minuta." });
  }

  const [h, m, s] = vrijeme_termina.split(":").map(Number);
  const vrijemePocetka = new Date(datum);
  vrijemePocetka.setHours(h, m, s || 0, 0);

  // validacija
  const sada = new Date();
  if (vrijemePocetka < sada) {
    return res.status(400).json({ message: "Termin ne može biti u prošlosti." });
  }

  const vrijemeZavrsetka = new Date(vrijemePocetka.getTime() + trajanjeMin * 60000);

  // validacija
  try {
    const preklapanje = await db.query(`
      SELECT * FROM termin 
      WHERE id_trenera = $1 AND datum = $2
        AND (
          (vrijeme_termina <= $3 AND (vrijeme_termina + trajanje::interval) > $3)
          OR
          (vrijeme_termina < $4 AND (vrijeme_termina + trajanje::interval) >= $4)
          OR
          (vrijeme_termina >= $3 AND (vrijeme_termina + trajanje::interval) <= $4)
        )
    `, [id_trenera, datum, vrijemePocetka.toTimeString().slice(0, 8), vrijemeZavrsetka.toTimeString().slice(0, 8)]);

    if (preklapanje.rows.length > 0) {
      return res.status(409).json({ message: "Postoji preklapanje s drugim terminom u istom vremenskom intervalu." });
    }
  } catch (err) {
    console.error("[terminController] Greška pri provjeri preklapanja:", err.message);
    return res.status(500).json({ error: "Greška pri provjeri termina." });
  }

  try {
    const noviTermin = await Termin.create({
      ...req.body,
      dostupnost: "available",
    });
    res.status(201).json(noviTermin);
  } catch (err) {
    console.error("[terminController] Greška prilikom unosa termina:", err.message);
    res.status(500).json({ error: err.message });
  }
};
