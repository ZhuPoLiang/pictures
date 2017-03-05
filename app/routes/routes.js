var Index = require('../controller/index'),
    Users = require('../controller/users');

var proxy = require('express-http-proxy'),
    urlStr = 'http://www.wookmark.com';

module.exports = function (app) {
    app.use(function (req, res, next) {
        var oUserAgent = req.headers['user-agent'].toLowerCase(),
            isMSIE = oUserAgent.match(/(msie\s|trident\/)(\d.+)/);

        if (isMSIE) {
            return res.render('caveat', {title : '友情提示', content : 'Oh My God！！您还在用IE？'});
        }

        next();
    });

	// index
	app.use('/', Index);

	// user
	app.use('/users', Users);

	// 跨域图片接口数据
	app.use('/images', proxy(urlStr, {
        forwardPath: function(req, res) {
            return '/api/json' + require('url').parse(req.url).path;
        }
    }));
};
