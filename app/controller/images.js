// var DM = {
// 		http : require('http'),
// 		https : require('https'),
// 	}, 
// 	urlStr = 'http://www.wookmark.com/api/json/popular';

// DM.http.get(urlStr, function (res) {

// 	var image_list = [],
// 		image_num = 0;

// 	res.on('data', function (data) {
// 		image_list.push(data);
// 		image_num += data.length;
// 	});

// 	res.on('end', function () {
// 		console.log(image_list.toString('utf-8'))
// 	});

// }).on('error', function () {
// 	console.log('爬取数据失败')
// });