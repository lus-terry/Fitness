
const express = require('express');
const router = express.Router();
const controller = require('../controllers/treningVjezbaController');

router.post('/', controller.linkExerciseToTraining);

module.exports = router;
