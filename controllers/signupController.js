const knex = require('knex')(require('../knexfile').development);
const uuid = require('uuid');

exports.checkUsername = (req, res) => {
	const { username } = req.params;

	knex('users')
		.where({ username: username })
		.then(data => {
			if(data.length === 0){
				res.status(200).json({ available: true });
				return;
			}
			res.status(200).json({ available: false });
		})
		.catch(err => {
			res.status(500).send(`An unexpected error occured : ${err}`);
		});
};

exports.uploadAvatar = (req, res) => {
	if(!req.files){
		return res.status(500).send("File was not found in request");
	}

	const avatar = req.files.file;
	const extension = avatar.name.split('.').pop();
	const filename = `${uuid.v4()}.${extension}`;

	avatar.mv(`${__dirname}/../public/avatars/${filename}`, function(err){
		if(err){
			return res.status(500).send(`Error (${err}) occured while trying to put avatar image file into public avatars folder`);
		}
	});

	res.status(200).json(JSON.stringify({ filename: filename }));
};
