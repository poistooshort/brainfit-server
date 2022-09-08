const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

router.route('/')
	.post(signupController.uploadAvatar);

router.route('/checkUsername/:username')
	.get(signupController.checkUsername);

module.exports = router;
