const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	if(!req.files) {
		return res.status(500).send("File was not found in request");
	}

	const { title, description } = req;
	const file = req.files.file;

	file.mv(`${__dirname}/../public/images/test.gif`, function (err) {
		if(err) {
			return res.status(500).send('Error occured while trying to put image file into public images folder');
		}
		return res.send('Successfully uploaded image to public images folder');
	});
});

module.exports = router;
