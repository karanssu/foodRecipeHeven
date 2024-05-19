const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const authRoute = require("./routes/auth/auth");
const dbConnection = require("./config/db.config");
require("dotenv").config();

const CLIENT_URL = process.env.CLIENT_URL;

const makeApp = (dbUrl) => {
	const app = express();

	dbConnection(dbUrl);

	const coresOptions = {
		origin: [CLIENT_URL],
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	};

	app.use(cors(coresOptions));
	app.use(express.json());
	app.use(
		cookieSession({
			name: "session",
			keys: ["foodrecipeheven"],
			maxAge: 24 * 60 * 60 * 100,
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());
	app.use("/google/auth", authRoute);

	// user routes
	app.use("/user", require("./routes/user/users"));
	app.use("/user", require("./routes/user/userSignup"));
	app.use("/user", require("./routes/user/userLogin"));

	return app;
};

module.exports = makeApp;
