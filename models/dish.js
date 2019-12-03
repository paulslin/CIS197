var mongoose = require('mongoose')

var dishSchema = new mongoose.Schema({
  dishName: {type: String},
  dishCuisine: {type: String},
  dishSkills: {type: [String]},
  dishAppliances: {type: [String]},
  dishIngrediants: {type: [String]}
})

// create a model to place items on
var Dish = mongoose.model('Dish', dishSchema)

/**
foods_list = ['Sushi']
foods_list.forEach(element => Dish.deleteMany({ dishName: element }, function (err) {
  if (err) return handleError(err);
}))
**/


/**
foods_list = ['Cake', 'Cookie', 'Ice_Cream', 'Egg_Tart', 'Cream_Puff', 'Cheesecake']
foods_list.forEach(element => Dish.deleteMany({ dishName: element }, function (err) {
  if (err) return handleError(err);
}))

// American Dishes
var cookie = new Dish ({dishName: 'Cookie', dishCuisine:  'American', dishIngrediants: ['Egg', 'Flour', 'Sugar'],
  dishSkills:['Baking', 'Decorating', 'Kneading', 'Mixing'], dishAppliances: ['Measuring Spoon', 'Oven', 'Tray', 'Whisk']})
cookie.save(function(err) {})
var ice_cream = new Dish ({dishName: 'Ice Cream', dishCuisine:  'American', dishIngrediants: ['Milk', 'Cream', 'Sugar'],
  dishSkills:['Mixing'], dishAppliances: ['Freezer', 'Measuring Spoon', 'Whisk']})
ice_cream.save(function(err) {})
var hamburger = new Dish ({dishName: 'Hamburger', dishCuisine:  'American', dishIngrediants: ['Bread', 'Beef', 'Lettuce', 'Tomato', 'Onion'],
  dishSkills:['Grilling', 'Cutting'], dishAppliances: ['Grill', 'Knife', 'Cutting Board']})
hamburger.save(function(err) {})
var fries = new Dish ({dishName: 'Fries', dishCuisine:  'American', dishIngrediants: ['Potato'],
  dishSkills:['Frying'], dishAppliances: ['Air Fryer']})
fries.save(function(err) {})

// Cajun Dishes
var jambalaya = new Dish ({dishName: 'Jambalaya', dishCuisine:  'Cajun', dishIngrediants: ['Rice', 'File', 'Sausage', 'Peppers', 'Onions'],
  dishSkills:['Boiling', 'Dicing'], dishAppliances: ['Knife', 'Cutting Board','Rice Cooker', 'Pot', 'Stove']})
jambalaya.save(function(err) {})
var gumbo = new Dish ({dishName: 'Gumbo', dishCuisine:  'Cajun', dishIngrediants: ['Rice', 'File', 'Shrimp', 'Sausage', 'Peppers', 'Onions'],
  dishSkills:['Boiling', 'Dicing'], dishAppliances: ['Knife', 'Cutting Board','Rice Cooker', 'Pot', 'Stove']})
gumbo.save(function(err) {})

// Chinese Dishes
var egg_tart = new Dish ({dishName: 'Egg Tart', dishCuisine:  'Chinese', dishIngrediants: ['Egg', 'Flour', 'Milk', 'Sugar'],
  dishSkills:['Baking', 'Kneading', 'Mixing'], dishAppliances: ['Freezer', 'Measuring Spoon', 'Oven', 'Tray', 'Whisk']})
egg_tart.save(function(err) {})
var dumpling = new Dish ({dishName: 'Dumpling', dishCuisine:  'Chinese', dishIngrediants: ['Flour', 'Pork', 'Bok Choy'],
  dishSkills:['Boiling', 'Dicing', 'Kneading'], dishAppliances: ['Knife', 'Cutting Board', 'Pot', 'Stove']})
dumpling.save(function(err) {})
var beef_noodle = new Dish ({dishName: 'Beef Noodle Soup', dishCuisine:  'Chinese', dishIngrediants: ['Noodles', 'Beef', 'Bok Choy'],
  dishSkills:['Boiling', 'Cutting'], dishAppliances: ['Knife', 'Cutting Board', 'Pot', 'Stove']})
beef_noodle.save(function(err) {})
var fried_rice = new Dish ({dishName: 'Fried Rice', dishCuisine:  'Chinese', dishIngrediants: ['Rice', 'Egg', 'Chicken', 'Peas', 'Soy Sauce', 'Carrot'],
  dishSkills:['Dicing'], dishAppliances: ['Rice Cooker', 'Stove', 'Pan']})
fried_rice.save(function(err) {})

// French Dishes
var cake = new Dish ({dishName: 'Cake', dishCuisine:  'French', dishIngrediants: ['Egg', 'Flour', 'Sugar'],
  dishSkills:['Baking', 'Decorating', 'Mixing'], dishAppliances: ['Measuring Spoon', 'Oven', 'Pan', 'Whisk']})
cake.save(function(err) {})
var cream_puff= new Dish ({dishName: 'Cream Puff', dishCuisine:  'French', dishIngrediants: ['Cream', 'Egg', 'Flour', 'Sugar'],
  dishSkills:['Baking', 'Decorating', 'Mixing'], dishAppliances: ['Freezer', 'Measuring Spoon', 'Pan', 'Whisk']})
cream_puff.save(function(err) {})
var cheesecake = new Dish ({dishName: 'Cheesecake', dishCuisine:  'French', dishIngrediants: ['Cinnamon', 'Cream', 'Egg', 'Flour', 'Sugar'],
  dishSkills:['Baking', 'Decorating', 'Mixing'], dishAppliances: ['Freezer', 'Measuring Spoon', 'Pan', 'Whisk']})
cheesecake.save(function(err) {})

// Greek Dishes

// Indian Dishes

// Italian Dishes
var spaghetti = new Dish ({dishName: 'Spaghetti', dishCuisine:  'Italian', dishIngrediants: ['Noodles', 'Tomato', 'Cheese'],
  dishSkills:['Boiling', 'Cutting'], dishAppliances: ['Knife', 'Cutting Board', 'Pot', 'Stove']})
spaghetti.save(function(err) {})
var lasagna = new Dish ({dishName: 'Lasagna', dishCuisine:  'Italian', dishIngrediants: ['Noodles', 'Tomato', 'Cheese', 'Beef'],
  dishSkills:['Cutting', 'Baking'], dishAppliances: ['Knife', 'Cutting Board', 'Tray', 'Oven']})
lasagna.save(function(err) {})

// Japanese Dishes
var sushi = new Dish ({dishName: 'Sushi', dishCuisine:  'Japanese', dishIngrediants: ['Rice', 'Seaweed', 'Fish'],
  dishSkills:['Cutting'], dishAppliances: ['Knife', 'Cutting Board', 'Rice Cooker']})
sushi.save(function(err) {})
var ramen = new Dish ({dishName: 'Ramen', dishCuisine:  'Japanese', dishIngrediants: ['Noodles', 'Egg'],
  dishSkills:['Boiling', 'Microwaving'], dishAppliances: ['Microwave', 'Pot', 'Stove']})
ramen.save(function(err) {})
var katsudon = new Dish ({dishName: 'Katsudon', dishCuisine:  'Japanese', dishIngrediants: ['Rice', 'Egg', 'Pork'],
  dishSkills:['Frying'], dishAppliances: ['Air Fryer', 'Rice Cooker']})
katsudon.save(function(err) {})

// Korean Dishes
var kimbap = new Dish ({dishName: 'Kimbap', dishCuisine:  'Korean', dishIngrediants: ['Rice', 'Seaweed', 'Carrot', 'Beef'],
  dishSkills:['Cutting'], dishAppliances: ['Knife', 'Cutting Board', 'Rice Cooker']})
kimbap.save(function(err) {})

// Mediterranean Dishes

// Mexican Dishes
var burrito = new Dish ({dishName: 'Burrito', dishCuisine:  'Mexican', dishIngrediants: ['Rice', 'Cheese', 'Beans', 'Tomato', 'Beef', 'Guacomole'],
  dishSkills:['Steaming', 'Dicing'], dishAppliances: ['Knife', 'Cutting Board','Rice Cooker', 'Stove']})
burrito.save(function(err) {})

// Peruvian Dishes

// Soul Dishes

// Spanish Dishes

// Thai Dishes

// Vietnamese Dishes
**/

module.exports = Dish
