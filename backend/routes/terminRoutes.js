const express = require('express');
const router = express.Router();

const terminController = require('../controllers/terminController');
const { verifyToken } = require('../middlewares/authMiddleware');

//router.get('/', terminController.getAll);
router.post('/', verifyToken, terminController.create);
console.log('[verifyToken] Pokrenut');


module.exports = router;
