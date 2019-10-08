var express = require('express')
var router = express.Router()
var Question = require('../models/question.js')

router.get('/questions', function(_, res) {
  // print all questions
  Question.find({}, function(err, result) {
    res.json(result)
  })
})

router.post('/questions/add', function(req, res, next) {
  var { questionText } = req.body // ES6 shorthand
  var author = req.session.user
  var q = new Question({ questionText, author}) // ES6 shorthand
  q.save(function(err) {
    if (err) next(err)
    res.json({ status: 'OK' })
  })
})

router.post('/questions/answer', function(req, res, next) {
  // find a question by question id
  Question.findById(req.body['_id'], function (err, question) {
    // get answer and update the answer
    question.answer = req.body['answer']
    question.save(function (saveErr) {
      if (saveErr) next(saveErr)
      res.json({ status: 'OK' })
    })
  })
})




module.exports = router
