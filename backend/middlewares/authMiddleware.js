const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('[verifyToken] Authorization header:', authHeader); // 🪵 Prikazuje cijeli header

  const token = authHeader?.split(' ')[1];
  console.log('[verifyToken] Izdvojen token:', token); // 🪵 Prikazuje samo token

  if (!token) {
    console.warn('[verifyToken] Token nije poslan.'); // ⚠️ Nema tokena
    return res.status(401).json({ message: 'Token nije poslan' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('[verifyToken] Token nije valjan:', err.message); // ❌ Nevažeći token
      return res.status(403).json({ message: 'Nevažeći token' });
    }

    console.log('[verifyToken] Token uspješno verificiran. Korisnik:', user); // ✅ Token OK
    req.user = user;
    next();
  });
};
