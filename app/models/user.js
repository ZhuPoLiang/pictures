var mongoose = require('mongoose'),
	crypto = require('crypto');

var UserSchema = new mongoose.Schema({
	name : {
		unique : true,
		type : String
	},
	password  : String,
	email  : {
		unique : true,
		type : String
	},
	meta : {
		type : Date,
		default : Date.now()
	}
});

UserSchema.pre('save', function (next) {
	/*
	 *	表单保存在基本的常识内都必须d对重要的数据进行加密保存
	 *	在node中利用crypto进行MD5的加密
	 *	createHash : 创建Hash算法实例，算法有md5、sha1、sha256、sha512、ripemd160
	 *	update : 将字符串叠加，可重复调用添加字符串
	 *	digest : 返回加密的字符串
	 */
	this.password = crypto.createHash('md5').update(this.password).digest('hex');

	next();
});

UserSchema.statics = {
	fetch : function (callback) {
		return this.find({}).exec(callback);
	},
	findByOne : function (type, value, callback) {
		var _query = type === 'email' ? ({email: value}) : ({name: value});

		return this.findOne(_query).exec(callback);
	}
};

module.exports = mongoose.model('User', UserSchema);
