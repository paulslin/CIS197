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
foods_list = ['Cake', 'Cookie', 'Ice_Cream', 'Egg_Tart', 'Cream_Puff', 'Cheesecake']
foods_list.forEach(element => Dish.deleteMany({ dishName: element }, function (err) {
  if (err) return handleError(err);
}))



var cake = new Dish ({dishName: 'Cake', dishCuisine:  'French', dishIngrediants: ['Egg', 'Flour', 'Sugar'],
  dishSkills:['Baking', 'Decorating', 'Mixing'], dishAppliances: ['Oven', 'Pan', 'Whisk']})
cake.save(function(err) {})
var cookie = new Dish ({dishName: 'Cookie', dishCuisine:  'American', dishIngrediants: ['Egg', 'Flour', 'Sugar'],
  dishSkills:['Baking', 'Decorating', 'Kneading', 'Mixing'], dishAppliances: ['Oven', 'Tray', 'Whisk']})
cookie.save(function(err) {})
var ice_cream = new Dish ({dishName: 'Ice_Cream', dishCuisine:  'American', dishIngrediants: ['Milk', 'Cream', 'Sugar'],
  dishSkills:['Mixing'], dishAppliances: ['Freezer', 'Whisk']})
ice_cream.save(function(err) {})
var egg_tart = new Dish ({dishName: 'Egg_Tart', dishCuisine:  'Chinese', dishIngrediants: ['Egg', 'Flour', 'Milk', 'Sugar'],
  dishSkills:['Baking', 'Kneading', 'Mixing'], dishAppliances: ['Freezer', 'Oven', 'Tray', 'Whisk']})
egg_tart.save(function(err) {})
var cream_puff= new Dish ({dishName: 'Cream_Puff', dishCuisine:  'French', dishIngrediants: ['Cream', 'Egg', 'Flour', 'Sugar'],
  dishSkills:['Baking', 'Decorating', 'Mixing'], dishAppliances: ['Freezer', 'Pan', 'Whisk']})
cream_puff.save(function(err) {})
var cheesecake = new Dish ({dishName: 'Cheesecake', dishCuisine:  'French', dishIngrediants: ['Cinnamon', 'Cream', 'Egg', 'Flour', 'Sugar'],
  dishSkills:['Baking', 'Decorating', 'Mixing'], dishAppliances: ['Freezer', 'Pan', 'Whisk']})
cheesecake.save(function(err) {})
**/

//console.log(cake)
/**
Dish.findOne({ dishName: "Egg_Tart" }, function(
  err,
  result)
  {console.log(result)}
)
**/

// module.exports = mongoose.model('Dish', dishSchema)
module.exports = Dish
