var express = require('express');
var path = require('path'); //路由中间件
var favicon = require('serve-favicon'); //图标中间件
var logger = require('morgan'); //日记中间件
var cookieParser = require('cookie-parser'); //cookie中间件
var bodyParser = require('body-parser'); // 解析请求体中间件
var session = require('express-session');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var serveStatic = require('serve-static');

var app = express();

//连接数据库
var serverAction = 'mongodb://localhost/test';
mongoose.connect(serverAction);

// 视图所在的目录
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'html'); //设置使用的模板引擎
app.engine('.html',require('ejs').__express); //要是用html作为模板就需要加上此代码

//网站图标
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

//解析请求体的json数据
app.use(bodyParser.json());
//解析form表单的中间件
app.use(bodyParser.urlencoded({
    extended: false
}));
//cookie中间件
app.use(cookieParser());

// 设置session
app.use(session({
    secret: 'zhu',
    store: new mongoStore({
        url: serverAction,
        resave: false,
        saveUninitialized: true,
        collection: 'sessions'
    })
}));

//引入路由模块
require('./app/routes/routes')(app);

//网站静态文件目录
app.use(serveStatic(path.join(__dirname, '/')));

//一个对时间各种处理的中间模块
app.locals.moment = require('moment');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
// 开发环境下
var env = process.env.NODE_ENV || 'development';
if (app.get('env') === env) {
    app.locals.pretty = true; //格式化源代码
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
    app.use(logger('dev')); //日记中间件
    mongoose.set('debug', true); //数据库日志
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
