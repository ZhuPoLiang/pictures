var Index = require('./index'),
	Users = require('./users'),
	Reptile = require('./reptile');
	Images = require('./images');

module.exports = function(app) {

	app.use(function(req, res, next) {
		
		//var _user = req.session.user;

		//判断是否低于ie10
		var oUserAgent = req.headers['user-agent'].toLowerCase(),
	        oMSIE = oUserAgent.match(/msie ([\d.]+)/),
	        oVersion = oMSIE ? parseInt(oMSIE[1],10) : null;
	    
	    if (oMSIE && oVersion < 10) {
	        return res.render('errorIE',{title : ' 友情提示', tip : '您的浏览器版本过低！'});
	    }

		//app.locals.user = _user;

		next();

	});

	// index
	app.use('/', Index);

	// user
	app.use('/users', Users);

	// 跨域图片接口数据
	app.use('/images', Images);
	
	// 爬虫数据
	app.use('/reptile', Reptile);
};
