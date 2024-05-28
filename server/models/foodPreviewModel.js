const mongoose = require("mongoose");

const foodPreviewSchema = new mongoose.Schema(
	{
		imageUrl: {
			type: String,
			default: "https://via.placeholder.com/150?text=No+Image+Available",
		},
		tags: {
			type: [String],
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			default: 4,
		},
		serving: {
			type: Number,
			required: true,
		},
		cookingTimeMin: {
			type: Number,
			required: true,
		},
	},
	{ collection: "foodPreview" }
);

module.exports = mongoose.model("foodPreview", foodPreviewSchema);
