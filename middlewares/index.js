module.exports = isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      res.redirect('/users/login')
    } else {
      next()
    }
  };