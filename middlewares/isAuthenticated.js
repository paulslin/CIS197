var isAuthenticated = function (req, res, next) {
  // set the user
  if (req.session.userId) {
    next()
  } else {
    res.redirect('/')
  }
}

module.exports = isAuthenticated;
