var express = require('express')
var router = express.Router()
var isAuthenticated = require('../middlewares/isAuthenticated')
var User = require('../models/user.js')

// get routes
router.get('/signup', function(req, res) {
  res.render('signup')
})
router.get('/login', function(_, res) {
  res.render('login')
})

router.get('/profile', async (req, res) => {
  // User.findById(req.session.userId)
  // .then(user => {
  //   res.render('profile.html', {account: user})
  // })
  const user = await User.findById(req.session.userId)
  res.render('profile.html', {user: req.session.user, account: user})
})

router.get('/profile_cuisines', async (req, res) => {
  const user = await User.findById(req.session.userId)
  res.render('profile_cuisines.html', {account: user})
})

router.get('/profile_skills', async (req, res) => {
  const user = await User.findById(req.session.userId)
  res.render('profile_skills.html', {account: user})
})

router.get('/profile_appliances', async (req, res) => {
  const user = await User.findById(req.session.userId)
  res.render('profile_appliances.html', {account: user})
})

router.get('/profile_ingrediants', async (req, res) => {
  const user = await User.findById(req.session.userId)
  res.render('profile_ingrediants.html', {account: user})
})

// sign-up page:
router.post('/signup', function(req, res, next) {
  // intake username and password information
  var username = req.body.username
  var password = req.body.password
  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var age = req.body.age
  var gender = req.body.gender
  // create a new user and save information
  var u = new User({ username: username, password: password,
    firstName: firstName, lastName: lastName, age: age, gender: gender})
  u.save(function(err) {
    if (err) { // Case: sign-up unsuccesful, throw error
      next(err)
    }
    if (!err) { // Case: sign-up successful, redirect to home page
      res.redirect('/')
    }
  })
})

// login-page
router.post('/login', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password
  // find user among users list
  User.findOne({ username: username, password: password }, function(
    err,
    result
  ) {
    // Success Case: if user passes, then allow and redirect to profile
    if (!err && result != null) {
      req.session.userId = result.id
      res.redirect('/account/profile')
    } else {
      // Unsuccessful Case: user fails, say authenticaion fails
      next(new Error('invalid credentials'))
    }
  })
})

// profile
router.post('/profile', function(req, res, next) {
  var username = req.session.account.username
  var password = req.session.account.password
  // find user among users list
  User.findOne({ username: username, password: password }, function(err, result) { 
    if (!err && result != null) {
    // Success Case: redirect to profile page
      res.redirect('/account/profile')
    } else { 
    // Unsuccessful Case: user profile fails
      next(new Error('Profile Access unavailable'))
    }
  })
})

// profile cuisines
router.post('/profile_cuisines', function(req, res, next) {
  var username = req.session.account.username
  var password = req.session.account.password
  // update within databse
  User.findOneAndUpdate({ username: username, password: password },
    {cuisines: req.body.cuisines},
    function(err, result) {
      if (!err && result != null) {
        res.redirect('/account/profile')
      } else { 
        next(new Error('Cuisines Update Fail'))
      }
    })
})

// profile skills
router.post('/profile_skills', function(req, res, next) {
  var username = req.session.account.username
  var password = req.session.account.password
  // update within databse
  User.findOneAndUpdate({ username: username, password: password },
    {skills: req.body.skills},
    function(err, result) {
      if (!err && result != null) {
        res.redirect('/account/profile')
      } else { 
        next(new Error('Skills Update Fail'))
      }
    })
})

// profile appliances
router.post('/profile_appliances', function(req, res, next) {
  var username = req.session.account.username
  var password = req.session.account.password
  // update within databse
  User.findOneAndUpdate({ username: username, password: password },
    {appliances: req.body.appliances},
    function(err, result) {
      if (!err && result != null) {
        res.redirect('/account/profile')
      } else { 
        next(new Error('Appliances Update Fail'))
      }
    })
})

// profile ingrediants
router.post('/profile_ingrediants', function(req, res, next) {
  var username = req.session.account.username
  var password = req.session.account.password
  // update within databse
  User.findOneAndUpdate({ username: username, password: password },
    {ingrediants: req.body.ingrediants},
    function(err, result) {
      if (!err && result != null) {
        res.redirect('/account/profile')
      } else { 
        next(new Error('Ingrediants Update Fail'))
      }
    })
})

// logout-page: redirect back to home page
router.get('/logout', isAuthenticated, function(req, res) {
  req.session.user = ''
  res.redirect('/')
})

module.exports = router
