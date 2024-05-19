const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			label: "username",
			trim: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			label: "email",
			trim: true,
			lowercase: true,
			unique: true,
		},
		password: {
			required: true,
			type: String,
			min: 8,
			trim: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{ collection: "user" }
);

module.exports = mongoose.model("user", userSchema);
