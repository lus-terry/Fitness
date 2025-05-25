
const express = require('express');
const router = express.Router();
const controller = require('../controllers/vjezbaController');

router.get('/', controller.getAll);
router.get('/trening/:id', controller.getByTreningId);
router.post('/', controller.create);
router.put('/:id', controller.update);

module.exports = router;
