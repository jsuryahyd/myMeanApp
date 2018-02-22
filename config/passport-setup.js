const passport = require('passport');
// const googleStrategy = require('passport-google-oauth20');
const config = require('../config/config');
const user = require('../models/user_model');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = config.jwtSecret;
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		console.log(jwt_payload);
		User.getUserById(jwt_payload.data._id, (err, user) => {
			if (err || !user) {
				return done(err, false);
			}
			if (user) {
				return done(null, user)
				// } else {
				// 	return done(null, false)
			}
		})
	}))
}