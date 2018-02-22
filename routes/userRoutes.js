const express = require('express');
const router = express.Router();
const User = require('../models/user_model.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config')
//console.log(require('util').inspect(User, {
//	depth: 2
//}));

router.get('/', (req, res, next) => {
	res.send('not allowed directly.\nGo to <a href="users/user-register">Registeration</a>');
	//    res.send(require('util').inspect(User, {
	//	depth: Infinity
	//}))

})

//Register page
router.post('/user-register', (req, res, next) => {
	// res.send('user registeration here');
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});
	User.addUser(newUser, (err, user) => {
		if (err) {
			console.log(err);
			res.json({
				success: false,
				msg: 'failed to register user'
			})
		} else {
			console.log(require('util').inspect(user, {
				depth: Infinity
			}))
		};
		res.json({
			success: true,
			msg: "successfully added user: " + req.body.name
		})
	})
})

//authentication
router.post('/authenticate', (req, res, next) => {
	// res.send('authenticate here by passport!?');
	const email = req.body.email;
	const password = req.body.password;
	// const username = req.body.username;
	// User.getUserByUsername(username, (err, matchedUserObj) => {
	User.getUserByEmail(email, (err, matchedUserObj) => {

		console.log(matchedUserObj)
		if (err) {
			res.json({
				success: false,
				msg: "Could not authenticate"
			})
		}

		if (matchedUserObj) {
			//check the password
			User.comparePassword(password, matchedUserObj.password, (err, match_bool) => {
				if (err) {
					console.log(err);
					res.status(500).send('Error while authenticating');
				}

				if (!match_bool) {
					res.json({
						success: false,
						msg: "Wrong Password"
					})
				}
				const token = jwt.sign({
					data: matchedUserObj
				}, config.jwtSecret, {
					expiresIn: 604800 // 1 week
				})

				//the userobj is sent when a get req comes with jwt
				res.json({
					success: true,
					token: "Bearer " + token,
					userObj: {
						id: matchedUserObj._id,
						username: matchedUserObj.username,
						email: matchedUserObj.email,
						name: matchedUserObj.name
					}
				})
			})
		} else {
			res.send('no such user')
		}
	})
})

//protect the following with passport and jwt we generated
router.get('/profile', passport.authenticate('jwt', {
	session: false
}), (req, res, next) => {
	//this is the object we sent above
	user = req.user;
	res.json({
		user: user
	});
})

module.exports = router;