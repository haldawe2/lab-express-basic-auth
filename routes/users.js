const router = require("express").Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const isLoggedIn = require('../middlewares');

router.get('/login', (req, res, next) => {
    const user = req.session.currentUser;
    res.render('./users/login', {user});
});

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.render("./users/login", {error: 'Must fill all fields'});
        return;
    };
    try {
        const userDB = await User.findOne({ username });
        if (!userDB) {
            res.render("./users/login", {error: 'Check that the username and password used are correct'});
            return;
        };
        const correctLogin = await bcrypt.compare(password, userDB.hashedPassword);
        if (correctLogin) {
            req.session.currentUser = userDB;
            res.redirect('/main');
        } else {
            res.render("./users/login", {error: 'Check that the username and password used are correct'});
            return;
        };
    } catch (error) {
        next(error);
    }
});

router.get('/profile', isLoggedIn, (req, res, next) => {
    const user = req.session.currentUser
    res.render('./users/private', {user});
});

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
          next(err);
        } else {
          res.clearCookie('basic-auth');
          res.redirect('/');
        }
      });
});

module.exports = router;