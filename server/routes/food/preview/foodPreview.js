const express = require("express");
const router = express.Router();
const foodPreviewModel = require("../../../models/foodPreviewModel");
require("dotenv").config();

router.get("/preview/", async (req, res) => {
	const schema = "https://api.spoonacular.com/recipes/complexSearch";
	const apiKey = process.env.FOOD_API_KEY;
	const skipCount = 0;
	const count = 100;

	const url = `${schema}&apiKey=${apiKey}&offset=${skipCount}&number=${count}`;

	const savedFoodPreviews = await foodPreviewModel.find();

	return res.status(200).json(savedFoodPreviews);
});

module.exports = router;
