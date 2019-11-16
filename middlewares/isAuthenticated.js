var isAuthenticated = function (req, res, next) {
  // set the user
  if (req.session.user && req.session.user.length > 0) {
    next()
  } else {
    res.redirect('/createprofile')
  }
}

module.exports = isAuthenticated;
