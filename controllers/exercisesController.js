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

	file.mv(`${__dirname}/../public/images/${filename}`, function(err) {
		if(err) {
			return res.status(500).send('Error occured while trying to put image file into public images folder');
		}
		console.log('Image successfully uploaded to public images folder');
	});

	const filenameData = { filename: filename };

	return res.status(200).json(JSON.stringify(filenameData));
};

exports.addExercise = (req, res) => {
	// fields: creator_id, title, equipment, description, filename
		
	return res.status(200).send('Exercise successfully crated');
};
