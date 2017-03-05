var express = require('express'),
	router = express.Router(),
	crypto = require('crypto'),
	user_model = require('../models/models').User;

/*
 *	用户注册登陆返回值相关信息
 *  result = {
 *  	-1 : 成功,
 *  	-2 : 用户已存在,
 *  	-3 : 邮箱已存在,
 *  	-4 : 用户不存在,
 *  	-5 : 邮箱不存在,
 *  	-6 : 服务器出错,
 *  	-7 : 密码错误
 *  }
 */

// 注册账户
router.route('/reg')
	.get(function (req, res) {
		res.render('reg', { title: '注册', h1 : '注册' });
	})
	.post(function(req, res) {
		var _user = req.body,
			User = null;

		/*
		 *	数据保存数据库前，先判断数据库是否存在有相同的账户名，没有就保存，有就返回错误信息
		 */
		user_model.findByOne('name', _user.name, function(err, data) {
			if (err) {
				res.status(500).json({msg : err});
			} else {
				if (data) {
					res.json({result : -2});
				} else {
					user_model.findByOne('email', _user.email, function(err, data) {
						if (err) {
							res.status(500).json({msg : err});
						} else {
							if (data) {
								res.json({result : -3});
							} else {
								User = new user_model(_user);

								User.save(function (err, user) {
									if (err) {
										return res.status(500).json({msg : err});
									};

									res.json({result : -1});
								});
							}
						}
					});
				}
			}
		});
	});

// 用户登录
router.route('/login')
	.get(function (req, res) {
		res.render('login', { title: '登陆', h1 : '登陆' });
	})
	.post(function (req, res) {
		var user = req.body,
			_type = user.name.indexOf('@') !== -1 ? 'email' : 'name';

		user_model.findByOne(_type, user.name, function(err, data) {
			if (err) {
				return res.status(500).json({msg : err});
			};

			if (!data && _type === 'name') {
				return res.json({result : -4});
			};

			if (!data && _type === 'email') {
				return res.json({result : -5});
			};

			var _cryptoPassword = crypto.createHash('md5').update(user.password).digest('hex');

			if (_cryptoPassword === data.password) {
				req.session.user = data;
				res.json({result : -1});
			} else {
				res.json({result : -7});
			}
		});

	});

// 用户登出
router.route('/logout')
	.get(function (req, res) {
		delete req.session.user;
		res.redirect('/');
	});

module.exports = router;
