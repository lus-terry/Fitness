const express = require('express');
const router = express.Router();
const treningController = require('../controllers/treningController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', treningController.getAll);

router.post('/', verifyToken, treningController.create);

module.exports = router;
