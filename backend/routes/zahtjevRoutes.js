const express = require('express');
const router = express.Router();
const zahtjevController = require('../controllers/zahtjevController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, zahtjevController.create);
router.get('/my-reservations', verifyToken, zahtjevController.getMyReservations);

module.exports = router;
