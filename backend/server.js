const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./db');
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

//primjeri 
app.use('/klijenti', require('./routes/klijentRoutes'));
app.use('/treneri', require('./routes/trenerRoutes'));
app.use('/termini', require('./routes/terminRoutes'));
app.use('/zahtjevi', require('./routes/zahtjevRoutes'));
app.use('/zapisi', require('./routes/fitnessZapisRoutes'));
app.use('/evidencije', require('./routes/evidentiraRoutes'));
//korisnik treba ili ne?

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





