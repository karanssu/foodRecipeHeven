const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./config/db.config");

require("dotenv").config();

dbConnection();
app.use(cors({ origin: "*" }));
app.use(express.json());

// user routes
app.use("/user", require("./routes/user/users"));
app.use("/user", require("./routes/user/userSignup"));

module.exports = app;
