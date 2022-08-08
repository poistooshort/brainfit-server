const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.route('/:exerciseId').get(commentsController.getComments);

router.route('/').post(commentsController.addComment);

module.exports = router;
