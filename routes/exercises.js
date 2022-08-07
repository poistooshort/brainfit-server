const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercisesController');

router.route('/images').post(exercisesController.addImage);

router.route('/').post(exercisesController.addExercise);

module.exports = router;
