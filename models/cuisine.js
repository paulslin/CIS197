var mongoose = require('mongoose')
var Dish = require('../models/dish.js')

var cuisineSchema = new mongoose.Schema({
  cuisineName: { type: String },
  dish: {type: [Dish]}
})

module.exports = mongoose.model('Cuisine', cuisineSchema)
