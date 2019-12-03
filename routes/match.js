var express = require('express')
var router = express.Router()
var User = require('../models/user.js')
var Dish = require('../models/dish.js')

router.get('/food', async (req, res) => {
  const user = await User.findById(req.session.userId)
  res.render('food.html', {account: user})
})

router.get('/people', async (req, res) => {
  const user = await User.findById(req.session.userId)
  res.render('people.html', {account: user})
})

router.get('/matched', async (req, res) => {
  const user = await User.findById(req.session.userId)
  res.render('matched.html', {account: user,
    chosen_dish: req.query.chosen_dish, cuisine: req.query.cuisine,
    current_user: req.query.current_user, total_user: req.query.total_user})
})


// helper function to iterate between user and each food
var foodMatcher = function(user, dish) {
  // create dictionary to hold missing items and a score count (allocate 25% to each category)
  var fulfilledList = []
  var missingList = []
  var foodScore = 0

  // score value for cuisines, add points if user cuisine matches dish cuisine
  if (user.cuisines) {
    var cuisineMatch = user.cuisines.includes(dish.dishCuisine)
    if (cuisineMatch) {
      foodScore += 25
    }
  }

  // analyze point values for other characteristics, and which elements user is missing
  var compareChar = function (user_list, dish_list) {
    if (user_list) {
      // get intersection of the two sets between user and dish (match between user and dish)
      var intersect = dish_list.filter(value => -1 !== user_list.indexOf(value))
      // get difference of two sets between user and dish (dish characteristics user does not have)
      var difference = dish_list.filter(value => !user_list.includes(value))
      fulfilledList.push(intersect)
      missingList.push(difference)
      // add fraction of dish list (multiplied by 25) as the food score
      foodScore += Math.ceil(((intersect.length) / (dish_list.length)) * 25)
    }
  }
  compareChar(user.skills, dish.dishSkills)
  compareChar(user.appliances, dish.dishAppliances)
  compareChar(user.ingrediants, dish.dishIngrediants)
  return [dish.dishName, foodScore, cuisineMatch, fulfilledList, missingList, dish.dishCuisine]
}

// find matching food
router.post('/food', function(req, res, next) {
  var username = req.session.account.username
  var password = req.session.account.password

  // creata lists to hold food items and thier scores
  var perfFood = []
  var highFood = []
  var mediumFood = []
  var lowFood = []


  function updateLists (callback) {
    User.findOne({ username: username, password: password }, function(err, user_result) {
      if (!err && user_result != null) {
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
            // sort lists of food in descending order based on food score
            perfFood.sort(function(b, a) {
              return a[1] - b[1]
            })
            highFood.sort(function(b, a) {
              return a[1] - b[1]
            })
            mediumFood.sort(function(b, a) {
              return a[1] - b[1]
            })
            lowFood.sort(function(b, a) {
              return a[1] - b[1]
            })
          })
          // call callback to update user food lists
          callback()
        })
      } else {
        next(new Error('Ingrediants Update Fail'))
      }
    })
  }

  // update user preference
  function updateUser() {
    // need a callback to update, as low food is current Empty
    User.findOneAndUpdate({ username: username, password: password },
      {perfectFood: perfFood, highFood: highFood, mediumFood: mediumFood, lowFood: lowFood},
      function(err, user_result) {
        if (!err && user_result != null) {
          res.redirect('/match/food')
        } else { 
          next(new Error('Ingrediants Update Fail'))
        }
      })
  }

  // call functions to update lists
  updateLists(updateUser)
})

// find matching food
router.post('/people', function(req, res, next) {
  var username = req.session.account.username

  var current_user
  var other_users = []
  var dish_cuisine
  var other_total = []

  // helper function to extract the food array of each user
  function extractArray (user, food) {
    // set temp variable for returning later on
    var dish_temp
    // check if food is within user's perfect food list
    if (user.perfectFood.length !== 0) {
      // iterate through perfect food list and see if food is within
      user.perfectFood.forEach(function(dish_array) {
        // set dish_temp to array
        if (dish_array[0] === food) {
          dish_temp = dish_array
        }
      })
    }
    // check if food within user's high food list
    if (user.highFood.length !== 0) {
      user.highFood.forEach(function(dish_array) {
        if (dish_array[0] === food) {
          dish_temp = dish_array
        }
      })
    }
    // check if food within user's medium food list
    if (user.mediumFood.length !== 0) {
      user.mediumFood.forEach(function(dish_array) {
        if (dish_array[0] === food) {
          dish_temp = dish_array
        }
      })
    }
    // check if food within user's low food list
    if (user.lowFood.length !== 0) {
      user.lowFood.forEach(function(dish_array) {
        if (dish_array[0] === food) {
          dish_temp = dish_array
        }
      })
    }
    // return array, with username in front
    return (dish_temp)
  }

  function generate_all (callback) {
    User.find(function(err, userlist) {

      // step 1: find all array containing information of each characteistics
      userlist.forEach(function(users) {
        if (!err && users != null) {
          if (users.username != username) {
            // Case 1: not current user: push data onto other users
            other_users.push({username: users.username,
              value: extractArray(users, req.body.food)})
          } else {
            // Case 2: is current user: set as current user
            current_user = extractArray(users, req.body.food)
          }
        } else {
          next(new Error('Ingrediants Update Fail'))
        }
      })

      // Step 2: compare current user with every other user
      Dish.findOne({dishName: req.body.food}, function(err, dish_result) {
        dish_cuisine = dish_result.dishCuisine
        other_users.forEach(function(other) {
          // set arrays for holding
          var both = []
          var user_only = []
          var other_only = []
          var neither = []
          var either = []
          
          var generate_distincts = function(userHas, userMissing, otherHas, otherMissing) { 
            // push onto seperate lists
            both.push(userHas.filter(value => -1 !== otherHas.indexOf(value)))
            user_only.push(userHas.filter(value => !otherHas.includes(value)))
            other_only.push(otherHas.filter(value => !userHas.includes(value)))
            neither.push(userMissing.filter(value => -1 !== otherMissing.indexOf(value)))

            var bothList = userHas.concat(otherHas)
            either.push(bothList.filter((item, pos) => bothList.indexOf(item) === pos))
          }
  
          // check cuisine and place into corresponding array
          if (current_user[2] && other['value'][2] ) {
            both.push(true)
            user_only.push(false)
            other_only.push(false)
            neither.push(false)
            either.push(true)
          } else if (current_user[2] && !other['value'][2]) {
            both.push(false)
            user_only.push(true)
            other_only.push(false)
            neither.push(false)
            either.push(true)
          } else if (!current_user[2] && other['value'][2]) {
            both.push(false)
            user_only.push(false)
            other_only.push(true)
            neither.push(false)
            either.push(true)
          } else {
            both.push(false)
            user_only.push(false)
            other_only.push(false)
            neither.push(true)
            either.push(true)
          }
          // generate distinct arrays for skills, applinaces, ingrediants
          generate_distincts(current_user[3][0], current_user[4][0], other['value'][3][0], other['value'][4][0])
          generate_distincts(current_user[3][1], current_user[4][1], other['value'][3][1], other['value'][4][1])
          generate_distincts(current_user[3][2], current_user[4][2], other['value'][3][2], other['value'][4][2])

          // Calculate Scores
          var combined_score = 0
          // add 25 points if either cuisine has matching cuisine
          if (either[0]) {
            combined_score += 25
          }

          // analyze point values for other characteristics, and which elements user is missing
          var compareChar = function (user_list, dish_list) {
            if (user_list) {
              var intersect = dish_list.filter(value => -1 !== user_list.indexOf(value))
              // add fraction of dish list (multiplied by 25) as the food score
              combined_score += Math.ceil(((intersect.length) / (dish_list.length)) * 25)
            }
          }
          compareChar(either[1], dish_result.dishSkills)
          compareChar(either[2], dish_result.dishAppliances)
          compareChar(either[3], dish_result.dishIngrediants)
          var other_final = [other['username'], combined_score, both, user_only, other_only, neither]
          other_total.push(other_final)
        })  

        // sort based on score value
        other_total.sort(function(b, a) {
          return a[1] - b[1]
        })
        callback()
      })
    })
  }

  function nextpage() {
    const url = require('url');
    res.redirect(url.format( {
      pathname:'/match/matched',
      query: {chosen_dish: req.body.food,
        cuisine: dish_cuisine,
        current_user: JSON.stringify(current_user),
        total_user: JSON.stringify(other_total)}
    }))
  }

  // call functions to generate all
  generate_all(nextpage)
})

module.exports = router