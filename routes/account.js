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
router.get('/profile', function(req, res) {
  res.render('profile.html', { user: req.session.user, account: req.session.account})
})
router.get('/profile_cuisines', function(req, res) {
  res.render('profile_cuisines.html', {account: req.session.account})
})
router.get('/profile_skills', function(req, res) {
  res.render('profile_skills.html', {account: req.session.account})
})
router.get('/profile_appliances', function(req, res) {
  res.render('profile_appliances.html', {account: req.session.account})
})
router.get('/profile_ingrediants', function(req, res) {
  res.render('profile_ingrediants.html', {account: req.session.account})
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
      req.session.user = username
      req.session.account = result
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
  User.findOne({ username: username, password: password }, function(
    err,
    result
  ) {
    if (!err && result != null) {
      console.log(result)
      res.redirect('/account/profile')
    } else { 
      next(new Error('Cuisines Update Fail'))
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
        // update for current session
        req.session.account.cuisines = req.body.cuisines
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
        // update for current session
        req.session.account.skills = req.body.skills
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
        console.log(req.body.appliances)
        // update for current session
        req.session.account.appliances = req.body.appliances
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
        // update for current session
        req.session.account.ingrediants = req.body.ingrediants
        res.redirect('/account/profile')
      } else { 
        next(new Error('Skills Update Fail'))
      }
    })
})

// logout-page: redirect back to home page
router.get('/logout', isAuthenticated, function(req, res) {
  req.session.user = ''
  res.redirect('/')
})

module.exports = router
