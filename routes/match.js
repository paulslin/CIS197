var express = require('express')
var router = express.Router()
var User = require('../models/user.js')
var Dish = require('../models/dish.js')

// get routes
/**
router.get('/food', function(req, res) {
  console.log(req.session)
  res.render('food.html', {dish: Dish, account: req.session.account})
})
**/

router.get('/food', async (req, res) => {
  const user = await User.findById(req.session.userId)
  res.render('food.html', {account: user})
})


// helper function to iterate between user and each food
var foodMatcher = function(user, dish) {
  // create dictionary to hold missing items and a score count (allocate 25% to each category)
  var fulfilledList = []
  var missingList = []
  var foodScore = 0

  // add 25 points if user cuisine matches dish cuisine
  var cuisineMatch = user.cuisines.includes(dish.dishCuisine)
  if (cuisineMatch) {
    foodScore += 25
  }

  // analyze point values for other characteristics, and which elements user is missing
  var compareChar = function (user_list, dish_list) {
    // get intersection of the two sets between user and dish (match between user and dish)
    var intersect = dish_list.filter(value => -1 !== user_list.indexOf(value))
    // get difference of two sets between user and dish (dish characteristics user does not have)
    var difference = dish_list.filter(value => !user_list.includes(value));
    fulfilledList.push(intersect)
    missingList.push(difference)
    // add fraction of dish list (multiplied by 25) as the food score
    foodScore += Math.ceil(((intersect.length) / (dish_list.length)) * 25)
  }
  compareChar(user.skills, dish.dishSkills)
  compareChar(user.appliances, dish.dishAppliances)
  compareChar(user.ingrediants, dish.dishIngrediants)
  return [dish.dishName, foodScore, cuisineMatch, fulfilledList, missingList]
}

// find matching food
router.post('/food', function(req, res, next) {
  var username = req.session.account.username
  var password = req.session.account.password
  // find a user
  User.findOne({ username: username, password: password }, function(err, user_result) {
    if (!err && user_result != null) {
      // creata lists to hold food items and thier scores
      var perfFood = []
      var highFood = []
      var mediumFood = []
      var lowFood = []
      // run for each loop between user preference and food to find matches
      Dish.find(function(err, dish_result) {
        // iterate through each food item and place them into respective lists
        dish_result.forEach(function(dish_item) {
          // run foodMatcher function to get score and missing/fulfilled elements
          var foodMatching = foodMatcher(user_result, dish_item)
          // add food items onto lists and case based off food score
          if (foodMatching[1] === 100) {
            perfFood.push(foodMatching)
          } else if (foodMatching[1] > 70 ) {
            highFood.push(foodMatching)
          } else if (foodMatching[1] > 30) {
            mediumFood.push(foodMatching)
          } else {
            lowFood.push(foodMatching)
          }
        })
        // update user in Mongoose database
        User.findOneAndUpdate({ username: username, password: password },
          {perfectFood: perfFood, highFood: highFood, mediumFood: mediumFood, lowFood: lowFood})
      })
      res.redirect('/match/food')
    } else { 
      next(new Error('Ingrediants Update Fail'))
    }
  })
})

// find matching individuals

module.exports = router
