const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercisesController');

router.route('/')
	.get(exercisesController.getExercises)
	.post(exercisesController.addExercise);

router.route('/:id')
	.get(exercisesController.getExercise)
	.delete(exercisesController.deleteExercise);

router.route('/images').post(exercisesController.addImage);

router.route('/likes/:exerciseId').put(exercisesController.updateLikes);

module.exports = router;
