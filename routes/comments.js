const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.route('/').post(commentsController.addComment);

router.route('/:exerciseId').get(commentsController.getComments);

module.exports = router;
