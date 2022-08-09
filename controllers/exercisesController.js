const knex = require('knex')(require('../knexfile').development);
const uuid = require('uuid');

exports.addImage = (req, res) => {
	if(!req.files){
		return res.status(500).send("File was not found in request");
	}

	const file = req.files.file;

	if(!file){
		return res.status(500).send("File was not found in the request");
	}

	const filename = `${uuid.v4()}.gif`;

	file.mv(`${__dirname}/../public/gifs/${filename}`, function(err) {
		if(err) {
			return res.status(500).send('Error occured while trying to put image file into public images folder');
		}
	});

	const filenameData = { filename: filename };

	return res.status(200).json(JSON.stringify(filenameData));
};

exports.addExercise = (req, res) => {
	// fields: creator_id, title, equipment, description, filename

	const newExercise = req.body;

	knex('exercises')
		.insert(newExercise)
		.then(data =>  {
			res.status(201).send(`New exercise was created with id : ${data[0]}`);
		})
		.catch(err => {
			res.status(400).send(`Error creating new exercise with code : ${err}`);
		});
};

exports.getExercises = (req, res) => {
	knex('exercises')
		.then(data => {
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(400).send(`Error retrieving list of exercises with error : ${err}`);
		});
};

exports.getExercise = (req, res) => {
	const { id } = req.params;

	knex('exercises')
		.where({ id: id })
		.then(data => {
			if(!data.length) {
				return res.status(404).send(`Exercise with id: ${id} was not found`);
			}
			res.status(200).json(data[0]);	
		})
		.catch(err =>  {
			res.status(400).send(`Error retrieving exercise with id: ${id}`);
		});
};

exports.updateLikes = (req, res) => {
	const { exerciseId } = req.params;
	
	knex('exercises')
		.where({ id: exerciseId })
		.update(req.body)
		.then(() => {
			res.status(200).send(`Likes for exercise (id: ${exerciseId}) have been updated.`);
		})
		.catch(err => {
			res.status(400).send(`Error trying to update likes with error: ${err}`);
		});
};

exports.deleteExercise = (req, res) => {
	const { id } = req.params;

	knex('exercises')
		.delete()
		.where({ id: id })
		.then(() => {
			res.status(204).send(`Successfully deleted exercise with id ${id}`);
		})
		.catch(err => {
			res.status(400).send(`Error trying to delete exercise with id ${id}`);
		});
}
