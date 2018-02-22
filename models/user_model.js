const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/config.js');

//schema
const userSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String
	},
	password: {
		type: String,
		required: true
	}
});


module.exports = User = mongoose.model('user', userSchema, 'mean_app');
module.exports.getUserById = (id, callback) => {
	User.findById(id, callback)
}

module.exports.getUserByUsername = function(username, callback) {
	query = {
		username: username
	};
	User.findOne(query, callback)
}

module.exports.getUserByEmail = (email, callback) => {
	let query = {
		email: email,
	}
	User.findOne(query, callback);
}
//console.log(require('util').inspect(module.exports.model,{depth:2}));
module.exports.addUser = (user, callback) => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				throw err;
			}
			user.password = hash;
			console.log(hash);
			user.save(callback);
		})
	})
}

module.exports.comparePassword = (pwd_input, hashFromDb, callback) => {
	//check if password input is same as hashFromDb
	bcrypt.compare(pwd_input, hashFromDb, (err, ismatch) => {
		if (err) throw err
		callback(null, ismatch)
	})
}