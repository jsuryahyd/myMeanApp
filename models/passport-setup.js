const passport = require('passport');
// const googleStrategy = require('passport-google-oauth20');
const config = require('../config/config');
const user = require('./user-model');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretKey = config.secret;
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		User.getUserById(jwt_payload.doc._id, (err, user) => {
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