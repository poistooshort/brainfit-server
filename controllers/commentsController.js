const knex = require('knex')(require('../knexfile').development);

exports.getComments = (req, res) => {
	const { exerciseId } = req.params;
};
