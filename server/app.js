const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db.config");

const makeApp = (dbUrl) => {
	const app = express();

	dbConnection(dbUrl);
	app.use(cors({ origin: "*" }));
	app.use(express.json());

	// user routes
	app.use("/user", require("./routes/user/users"));
	app.use("/user", require("./routes/user/userSignup"));

	return app;
};

module.exports = makeApp;
