const router = require("express").Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const saltRounds = 8

/* GET signup page */
/* ROUTE /auth/signup */
router.get("/signup", (req, res, next) => {
    res.render("./auth/signup");
  });

/* POST signup route */
/* ROUTE /auth/signup */
router.post("/signup", async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email ||!password) {
        res.render("./auth/signup", {error: 'Must fill all fields'});
    };
    const regexEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    if (!regexEmail.test(email)) {
        res.render("./auth/signup", {error: 'Must provide a valid email'});
    };
    const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (!regexPassword.test(password)) {
        res.render("./auth/signup", {error: 'Password must have at least 8 characters and contain one uppercase and lowercase letter, a special character and a number'});
    };
    try {
        const foundUser = await User.findOne({ username });
        if (foundUser) {
            res.render("./auth/signup", {error: 'Username alreday in use'});
            return;
        };
        const foundEmail = await User.findOne({ email });
        if (foundEmail) {
            res.render("./auth/signup", {error: 'Email already in use'});
            return;
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({ username, email, hashedPassword });
        res.redirect('/dashboard');
    } catch (error) {
        next(error);
    }
});

module.exports = router;