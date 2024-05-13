const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./config/db.config");

require("dotenv").config();

dbConnection();
app.use(cors({ origin: "*" }));
app.use(express.json());

// user routes
app.use("/user", require("./routes/user/userSignup"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
