const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const userModel = require("./models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET_ID,
			callbackURL: "/google/auth/google/callback",
			scope: ["profile", "email"],
		},
		async (accessToken, refreshToken, profile, callback) => {
			const firstName = profile.name.givenName.trim().toLowerCase();
			const lastName = profile.name.familyName.trim().toLowerCase();
			const email = profile.emails[0].value;
			const password = profile.id;

			try {
				let user = await userModel.findOne({ email: email });

				if (!user) {
					const uniuqeNum = new Date().valueOf();
					const username = firstName + lastName + uniuqeNum;
					const generateHash = await bcrypt.genSalt(Number(10));
					const hashPassword = await bcrypt.hash(password, generateHash);

					user = new userModel({ username, email, password: hashPassword });
					await user.save();
				}

				callback(null, user);
			} catch (error) {
				callback(error, false);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
