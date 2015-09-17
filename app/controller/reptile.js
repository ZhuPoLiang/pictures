// var DM = {
// 		url : require('url'),
// 		http : require('http'),
// 		https : require('https'),
// 		cheerio : require('cheerio')
// 	}, 
// 	urlStr = 'http://www.wookmark.com/api/json/popular',//'https://cnodejs.org/',
// 	Reptile = require('../../models/models').Reptile;

// var fnsMap = {
// 	parseData : function (data) {
// 		var $ = DM.cheerio.load(data),
// 			data_list = [];

// 		$('#topic_list').children().each(function (i, items) {
// 			var $_this = $(items),
// 				img_url_srt = $_this.children('a').find('img').attr('src'),
// 				replie_num = $_this.find('.count_of_replies').text().trim(),
// 				visit_num = $_this.find('.count_of_visits').text().trim(),
// 				title_str = $_this.find('.topic_title').text().trim(),
// 				active_date = $_this.find('.last_active_time').text().trim();

// 			data_list.push({
// 				imgSrc : img_url_srt,
// 				replie : replie_num,
// 				visit  : visit_num,
// 				title  : title_str,
// 				active : active_date
// 			});
// 		});

// 		return data_list;
// 	}
// }


// DM.https.get(urlStr, function (res) {

// 	var html_str = '';

// 	res.on('data', function (data) {
// 		html_str += data;
// 	});

// 	res.on('end', function () {

// 		var data_list = fnsMap.parseData(html_str);

// 		data_list.map(function (items) {
// 			new Reptile(items).save(function (err, replie) {
// 				if (err) {
// 					console.log(err);
// 				} else {
// 					console.log('数据保存成功');
// 				}
// 			});
// 		});
		
// 	});

// }).on('error', function () {
// 	console.log('爬取数据失败')
// });