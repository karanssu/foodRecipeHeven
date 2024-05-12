const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            label: "username",
        },
        email: {
            type: String,
            required: true,
            label: "email",
        },
        password: {
            required: true,
            type: String,
            min: 8,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: "user" }
);

module.exports = mongoose.model("user", userSchema);