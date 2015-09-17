var mongoose = require('mongoose');

module.exports = mongoose.model('Article', new mongoose.Schema({
	imgsrc : String,
	title  : String,
	visit  : Number,
	replie : Number,
	active : String
}));