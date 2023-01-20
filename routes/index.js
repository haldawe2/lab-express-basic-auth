const router = require("express").Router();
const isLoggedIn = require('../middlewares');

/* GET home page */
router.get("/", (req, res, next) => {
  const user = req.session.currentUser;
  res.render("index", {user});
});

router.get('/main', isLoggedIn, (req, res, next) => {
  const user = req.session.currentUser;
  res.render('main', {user});
});

module.exports = router;
