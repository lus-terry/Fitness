const express = require('express');
const router = express.Router();
const treningController = require('../controllers/treningController');
const { verifyToken } = require('../middlewares/authMiddleware');

// GET /trening - Dohvati sve treninge
router.get('/', treningController.getAll);

// POST /trening - Stvori novi trening (samo za autentificiranog trenera)
router.post('/', verifyToken, treningController.create);

module.exports = router;
