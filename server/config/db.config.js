const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports = () => {
    try {
        mongoose.connect(process.env.DB_URL);
        console.log("The backend has connected to the MongoDB database.");
    } catch (error) {
        console.log(`${error} could not connect`);
    }
};