var http = require('http'),
	express = require('express'),
	router = express.Router(),
	urlStr = 'http://www.wookmark.com/api/json/popular?page=',
	pageNum = 0;

router.get('/list/:id', function(req, res) {

	var _res = res,
		page_num = req.params.id;
		
	http.get(urlStr + pageNum, function (res) {

		var image_list = '';

		res.on('data', function (data) {
			image_list += data.toString('utf-8');
		});

		res.on('end', function () {
			_res.json(image_list);
		});

	}).on('error', function () {
		console.log('爬取数据失败')
	});

});

module.exports = router;