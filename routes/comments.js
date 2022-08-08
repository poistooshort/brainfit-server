const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.route('/:exerciseId').get(commentsController.getComments);

module.exports = router;
