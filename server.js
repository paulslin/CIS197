var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cookieSession = require('cookie-session')
var mongoose = require('mongoose')
var accountRouter = require('./routes/account.js')
var matchRouter = require('./routes/match.js')
var app = express()

app.use('/static', express.static(path.join(__dirname, 'static')))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hw5-new')

app.engine('html', require('ejs').__express)
app.set('view engine', 'html')

//app.use('/static', express.static(path.join(__dirname, 'static')))

app.use(bodyParser.urlencoded({ extended: false }))
// accept post data from AJAX requests
app.use(bodyParser.json())


app.use(
  cookieSession({
    name: 'local-session',
    keys: ['spooky'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
)

app.get('/', function(req, res, next) {
  res.render('index', {
    user: req.session.user
  })
})

app.post('/', function(req, res, next) {
  res.render('/')
})

// mount account and api routes
app.use('/account', accountRouter)
app.use('/match', matchRouter)

// don't put any routes below here!
app.use(function(err, _, res, next) {
  // res.send('ERROR :  ' + err.message)
  next(new Error('ERROR :  ' + err.message))
})

app.listen(process.env.PORT || 3000, function() {
  console.log('App listening on port ' + (process.env.PORT || 3000))
})
