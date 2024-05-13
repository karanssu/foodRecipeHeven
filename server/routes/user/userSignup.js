const express = require("express");
const router = express.Router();
const z = require("zod");
const bcrypt = require("bcrypt");
const { userSignupValidation } = require("../../models/userValidator");
const newUserModel = require("../../models/userModel");

router.post("/signup", async (req, res) => {
    const { error } = userSignupValidation(req.body);
    console.log(error);
    if (error)
        return res.status(400).send({ message: error.errors[0].message });

    const { username, email, password } = req.body;

    const user = await newUserModel.findOne({ username: username });
    if (user)
        return res
            .status(409)
            .send({ message: "Username is taken, pick another" });

    const generateHash = await bcrypt.genSalt(Number(10));

    const hashPassword = await bcrypt.hash(password, generateHash);

    const createUser = new newUserModel({
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