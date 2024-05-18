const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { userSignupValidator } = require("../../models/userValidator");
const userModel = require("../../models/userModel");

router.post("/signup", async (req, res) => {
	const { error } = userSignupValidator(req.body);
	if (error) return res.status(400).send({ message: error.errors[0].message });

	let { username, email, password } = req.body;
	username = username ? username.trim() : username;
	email = email ? email.trim().toLowerCase() : email;
	password = password ? password.trim() : password;

	const usernameExits = await userModel.findOne({ username: username });
	if (usernameExits)
		return res.status(409).send({ message: "Username is already taken" });

	const emailExists = await userModel.findOne({ email: email });
	if (emailExists)
		return res.status(409).send({ message: "Email is already taken" });

	const generateHash = await bcrypt.genSalt(Number(10));

	const hashPassword = await bcrypt.hash(password, generateHash);

	const createUser = new userModel({
		username: username,
		email: email,
		password: hashPassword,
	});

	try {
		const saveNewUser = await createUser.save();
		res.send(saveNewUser);
	} catch (error) {
		res.status(400).send({ message: "Error trying to create new user" });
	}
});

module.exports = router;
