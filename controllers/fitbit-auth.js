var env = process.env.NODE_ENV || 'production',
	config = require('../config')[env];

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OAuth2 = require('oauth').OAuth2,
	passport = require('passport'),
	FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;

// Configure Passport session management to use the Fitbit user
// These de/serialize functions work for this hack but are not
// well suited for "real world" apps because you'd want to persist
// the user's session across multiple Node instances and app reboots
passport.serializeUser(function(user, done) {
	// console.log("serialize user", user);
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	// console.log("deserialize obj", obj);
	done(null, obj);
});

// Tell Passport to use the Fitbit Strategy
passport.use(new FitbitStrategy({
		clientID: config.fitbitClientKey,
		clientSecret: config.fitbitClientSecret,
		callbackURL: "http://localhost:3000/auth/fitbit/callback",
		scope: ['activity','heartrate','location','profile']
	},
	function(accessToken, refreshToken, profile, done) {
		// Store the user credentials
		User.update(
			{ encodedId: profile.id },
			{
				encodedId: profile.id,
				accessToken: accessToken,
				refreshToken: refreshToken, 
				timezoneOffset: profile._json.user.offsetFromUTCMillis
			},
			{ upsert: true },
			function(err, numberAffected) {
				if (err) console.error(err);
				console.log('User updated ' + numberAffected + ' records.');
			}
		);

		var oauth2 = new OAuth2(
 			 config.fitbitClientKey,
 			 config.fitbitClientSecret,
 			 'https://api.fitbit.com/',
 			 null,
 			 'oauth2/token',
 			 null
		);

		// Subscribe this application to updates from the user's data
		oauth2.post(
			'https://api.fitbit.com/1/user/-/apiSubscriptions/' + profile.id + '-all.json',
			accessToken,
			refreshToken,
			null,
			null,
			function (err, data, res){
				if (err) console.error(err);
				console.log("Subscription creation attempt results:", data);
				return done(null, profile);
			}
		);
	}
));
