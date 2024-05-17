const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db.config");
require("dotenv").config();

const CLIENT_URL = process.env.CLIENT_URL;

const makeApp = (dbUrl) => {
	const app = express();

	dbConnection(dbUrl);

	const coresOptions = {
		origin: [CLIENT_URL],
	};

	app.use(cors(coresOptions));
	app.use(express.json());

	// user routes
	app.use("/user", require("./routes/user/users"));
	app.use("/user", require("./routes/user/userSignup"));

	return app;
};

module.exports = makeApp;
