const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercisesController');

router.route('/').get(exercisesController.getExercises);

router.route('/:id').get(exercisesController.getExercise);

router.route('/').post(exercisesController.addExercise);

router.route('/images').post(exercisesController.addImage);

module.exports = router;
