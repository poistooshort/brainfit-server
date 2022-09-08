const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

router.route('/checkUsername/:username')
	.get(signupController.checkUsername);

module.exports = router;
