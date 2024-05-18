const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (userId, username, email, password) => {
	return jwt.sign(
		{ id: userId, username, email, password },
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: "24h" }
	);
};

module.exports.generateAccessToken = generateAccessToken;
