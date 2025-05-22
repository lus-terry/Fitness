const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./db');

// middleware PRVO
app.use(cors());
app.use(express.json()); // ← OVO MORA IĆI PRIJE authRoutes

// rute
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// ostale rute
app.use('/klijenti', require('./routes/klijentRoutes'));
app.use('/treneri', require('./routes/trenerRoutes'));
app.use('/termini', require('./routes/terminRoutes'));
app.use('/zahtjevi', require('./routes/zahtjevRoutes'));
app.use('/zapisi', require('./routes/fitnessZapisRoutes'));
app.use('/evidencije', require('./routes/evidentiraRoutes'));


app.get('/', (req, res) => {
  res.send('Backend dela');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
