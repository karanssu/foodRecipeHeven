const mongoose = require("mongoose");

const makeDb = (dbUrl) => {
	try {
		mongoose.connect(dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("The backend has connected to the MongoDB database.");
	} catch (error) {
		console.log(`${error} could not connect to the MongoDB database!`);
	}
};

module.exports = makeDb;
