const knex = require('knex')(require('../knexfile').development);
const uuid = require('uuid');

exports.checkUsername = (req, res) => {
	const { username } = req.params;

	knex('users')
		.where({ username: username })
		.then(data => {
			if(data.length === 0){
				res.status(200).json({ available: true });
			}
			res.status(200).json({ available: false });
		})
		.catch(err => {
			res.status(500).send("An unexpected error occured :", err);
		});
};

exports.checkPassword = (req, res) => {
	console.log('inside checkPassword in signupController');
};
