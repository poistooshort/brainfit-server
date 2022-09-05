const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

router.route('/check/:username')
	.get(signupController.checkUsername);

router.route('/check/:password')
	.get(signupController.checkPassword);

module.exports = router;
