const knex = require('knex')(require('../knexfile').development);

exports.getComments = (req, res) => {
	const { exerciseId } = req.params;

	knex('comments')
		.where({ exerciseId: exerciseId })
		.then(data => {
			if(!data.length){
				res.status(204);
			}
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(400).send(`Error trying to fetch comments with error: ${err}`);
		});
};

exports.addComment = (req, res) => {
	knex('comments')
		.insert(req.body)
		.then(data => {
			res.status(201).send('Comment has been added');
		})
		.catch(err => {
			res.status(400).send(`Error adding comment with error : ${err}`);
		});
};
