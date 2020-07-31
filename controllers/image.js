const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'c12e65f21ad4436681e4ed325c969c50'
});

const handleApiCall = (req, res) => {
	app.models
    .predict(
        Clarifai.FACE_DETECT_MODEL, 
        req.body.input
    )
    .then(data => {
    	res.json(data)
    })
    .catch(err => res.status(400).json('unable to call Clarifai'))
};

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db.select('*').from('users').where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	.then(entries => {
		res.status(200).json(entries[0])
	})
	.catch(err => res.json('unknown'))
};


module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}