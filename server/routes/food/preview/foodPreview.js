const express = require("express");
const router = express.Router();
const foodPreviewModel = require("../../../models/foodPreviewModel");

router.get("/preview/", async (req, res) => {
	const foodPreviews = await foodPreviewModel.find();
	return res.status(200).json(foodPreviews);
});

module.exports = router;
