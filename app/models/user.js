var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	alias: String,
	invokerCode: String,
	username: {type: String, unique: true},
});

module.exports = mongoose.model('User', UserSchema);