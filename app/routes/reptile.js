var express = require('express'),
	router = express.Router(),
	Reptile = require('../models/models').Reptile;


router.get('/list', function(req, res) {

	Reptile.find({},function (err, result) {

		if (err) {
			console.log(err);
		} else {
			res.json(result)
		}

	});
	
});


module.exports = router;