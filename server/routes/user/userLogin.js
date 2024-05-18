const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { userLoginValidator } = require("../../models/userValidator");
const { generateAccessToken } = require("../../utilities/TokenGenerator");
const userModel = require("../../models/userModel");

router.post("/login", async (req, res) => {
	const { error } = userLoginValidator(req.body);

	if (error) return res.status(400).send({ message: error.errors[0].message });

	let { email, password } = req.body;
	email = email ? email.trim().toLowerCase() : email;
	password = password ? password.trim() : password;

	const user = await userModel.findOne({ email: email });

	if (!user)
		return res.status(401).send({
			message: "Incorrect email or password",
		});

	const isValidPassword = await bcrypt.compare(password, user.password);

	if (!isValidPassword)
		return res.status(401).send({
			message: "Incorrect email or password",
		});

	const accessToken = generateAccessToken(
		user._id,
		user.username,
		user.email,
		user.password
	);

	res.header("Authorization", accessToken).send({ accessToken: accessToken });
});

module.exports = router;
