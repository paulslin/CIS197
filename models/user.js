var mongoose = require('mongoose')

// create user information
var userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number},
  gender: { type: String },
  cuisines: { type: [String] },
  skills: { type: [String] },
  appliances: { type: [String] },
  ingrediants: { type: [String] },
  perfectFood: {type: []},
  highFood: {type: []},
  mediumFood: {type: []},
  lowFood: {type: []},
})

module.exports = mongoose.model('User', userSchema)
