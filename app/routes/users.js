var express = require('express'),
	router = express.Router(),
	user_model = require('../models/models').User;

/*
 *	用户注册登陆返回值相关信息
 *  result = {
 *  	-1 : 成功,
 *  	-2 : 用户已存在,
 *  	-3 : 邮箱已存在,
 *  	-4 : 用户不存在,
 *  	-5 : 服务器出错,
 *  	-6 : 密码错误
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
		user_model.findByOne(_user.name,function (err, data) {
			if (err) {
				res.status(500).json({msg : err});
			} else {
				if (data) {
					res.json({result : -2});
				} else {
					User = new user_model(_user);

					User.save(function (err, user) {
						if (err) {
							return res.status(500).json({msg : err});
						};

						res.json({result : -1});
					});
				};
			};
		});

	});

// 用户登录
router.route('/login')
	.get(function (req, res) {

		res.render('login', { title: '登陆', h1 : '登陆' });

	})
	.post(function (req, res) {

		var user = req.body;

		user.password = fnsMap.crypto(user.password);

		user_model.findByOne(user.name, function (err, data) {

			if (err) {
				return res.status(500).json({msg : err});
			};

			if (!data) {
				return res.json({result : -4});
			};

			new user_model().comparePassword(user.password, function (err, isMatch) {
				if (err) {
					return res.status(500).json({msg : err});
				};

				if (isMatch) {
					res.json({result : -1});
				} else {
					res.json({result : -6});
				}

			});
		});

	});

module.exports = router;