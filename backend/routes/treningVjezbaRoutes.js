// routes/treningVjezbaRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/treningVjezbaController');

// POST /trening_vjezba - poveži vježbu s treningom
router.post('/', controller.linkExerciseToTraining);

module.exports = router;
