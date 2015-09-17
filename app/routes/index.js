var express = require('express'),
	router = express.Router();


router.get('', function(req, res) {

	res.render('index', { title: 'css3练习', h1 : '首页' });
	
});


module.exports = router;