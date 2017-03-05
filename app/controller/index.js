'use strict';

let express = require('express'),
	router = express.Router();


router.get('/', function(req, res) {
	var _user = req.session.user;

	res.render('index', {
		title: 'node全栈练习',
		h1 : '首页',
		user: _user
	});
});


module.exports = router;
