const knex = require('knex')(require('../knexfile').development);
const uuid = require('uuid');

exports.checkUsername = (req, res) => {
	console.log('inside checkUsername in signupController');
};

exports.checkPassword = (req, res) => {
	console.log('inside checkPassword in signupController');
};
