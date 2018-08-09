var db = require('../models');
var sequelize = require('sequelize');
var Promise = require("bluebird");

exports.index = function (req, res) {
  var loggedIn = false;
  var userText = "";
  if (req.user) {
    loggedIn = true;
    userText = "Logged In as " + req.user.username;
  };

  db.Recipe.findAll({

  }).then(function (data) {
    console.log(data);
    res.json(data);
  });
};

// exports.viewRecipes = function (req, res) {
//   var arr = [];
//   db.Ingredient.findAll({}).then(
//     function (data) {
//       arr.push(data);
//     },
//     db.Recipe.findAll({}).then(
//       function (data2) {
//         arr.push(data2);
//       }),
//     db.RecipeAmount.findAll({
//       include: [db.Recipe, db.Ingredient]
//     }).then(function (data3) {
//       arr.push(data3);
//       res.json(arr)
//       // console.log(arr)
//     })
//   );
// };

exports.viewRecipes = function (req, res) {
  db.RecipeAmount.findAll({
    include: [
      {
        model: db.Recipe,
        as: 'Recipe'
      },
      {
        model: db.Ingredient,
        as: 'Ingredient'
      }
    ]
  }).then(function (data) {

    //allows to check if array already contains value
    //JSON.stringify converts objects to strings to allow for accurate comparison
    Array.prototype.contains = function (value) {
      for (var i = 0; i < this.length; i++) {
        if (JSON.stringify(this[i]) === JSON.stringify(value))
          return true;
      }
      return false;
    }

    var totalCaloriesSmall = 0;
    var totalCarbsSmall = 0;
    var totalSugarSmall = 0;
    var totalFatSmall = 0;
    var totalProteinSmall = 0;
    var totalCaloriesMedium = 0;
    var totalCarbsMedium = 0;
    var totalSugarMedium = 0;
    var totalFatMedium = 0;
    var totalProteinMedium = 0;
    var totalCaloriesLarge = 0;
    var totalCarbsLarge = 0;
    var totalSugarLarge = 0;
    var totalFatLarge = 0;
    var totalProteinLarge = 0;

    var recipes = {};
    const small = {
      ingredients: [],
      totals: {
        Calories: totalCaloriesSmall,
        Carbs: totalCarbsSmall,
        Sugar: totalSugarSmall,
        Fat: totalFatSmall, 
        Protein: totalProteinSmall
      }
    };
    const medium = [];
    const large = [];

    for (var i = 0; i < data.length; i++) {
      var recipeId = data[i].dataValues.RecipeId;
      if (!recipes[recipeId]) {
        recipes[recipeId] = [];
      }

      //Use Array.prototype.contains to push only unique recipe info into the recipe recipeId object
      if (!recipes[recipeId].contains(data[i].Recipe)) {
        recipes[recipeId].push(data[i].Recipe);
      }

      //ingredients, amounts and totals for small size
      if (data[i].Size === "sm") {

        var Calories = parseInt(data[i].dataValues.Ingredient.dataValues.Calories) * parseInt(data[i].Amount);
        var Carbs = parseInt(data[i].dataValues.Ingredient.dataValues.Carbs) * parseInt(data[i].Amount);
        var Sugar = parseInt(data[i].dataValues.Ingredient.dataValues.Sugar) * parseInt(data[i].Amount);
        var Fat = parseInt(data[i].dataValues.Ingredient.dataValues.Fat) * parseInt(data[i].Amount);
        var Protein = parseInt(data[i].dataValues.Ingredient.dataValues.Protein) * parseInt(data[i].Amount);
        totalCaloriesSmall += Calories;
        totalCarbsSmall += Carbs;
        totalSugarSmall += Sugar;
        totalFatSmall += Fat;
        totalProteinSmall += Protein;

        small.ingredients.push(
          {
              Ingredient: data[i].Ingredient,
              Amount: data[i].Amount
          }
        )
      }

      //ingredients, amounts and totals for medium size
      else if (data[i].Size === "md") {
        medium.push(
          {
            Ingredient: data[i].Ingredient,
            Amount: data[i].Amount
          }
        )
      }

      //ingredients, amounts and totals for large size
      else if (data[i].Size === "lg") {
        large.push(
          {
            Ingredient: data[i].Ingredient,
            Amount: data[i].Amount
          }
        )
      }
    }

    newData = [];
    for (var recipeId in recipes) {
      newData.push({
        RecipeInfo: recipes[recipeId],
        sizes: {
          'small': small,
          'medium': medium,
          'large': large
        }
      });
    }
    // console.log(JSON.stringify(newData, null, 2))
    res.json(newData)
  })
};

//query recipes by id
//join recipeamounts by recipeId & size
//add up calories, carbs, sugars, fat, protein
exports.recipeTotals = function (req, res) {
  var totalsArr = [];
  db.Recipe.findAll({})
    .then(function (data) {
      calculateTotals(data, function () {
        res.json(totalsArr);
        // console.log(totalsArr);
      });
    });


  function calculateTotals(data, callback) {
    for (var i = 0; i < data.length; i++) {
      db.RecipeAmount.findAll({
        where: {
          RecipeId: data[i].dataValues.id
        },
        include: [db.Recipe, db.Ingredient]
      })
        .then(function (data2) {
          var totalCaloriesSmall = 0;
          var totalCarbsSmall = 0;
          var totalSugarSmall = 0;
          var totalFatSmall = 0;
          var totalProteinSmall = 0;
          var totalCaloriesMedium = 0;
          var totalCarbsMedium = 0;
          var totalSugarMedium = 0;
          var totalFatMedium = 0;
          var totalProteinMedium = 0;
          var totalCaloriesLarge = 0;
          var totalCarbsLarge = 0;
          var totalSugarLarge = 0;
          var totalFatLarge = 0;
          var totalProteinLarge = 0;

          for (var j = 0; j < data2.length; j++) {
            // console.log("======== DataValues ========")
            // console.log(data2[0]);
            // console.log("======== DataValues ========")
            var size = data2[j].dataValues.Size;
            if (size === "sm") {
              var RecipeId = data2[j].dataValues.Recipe.dataValues.id
              var RecipeName = data2[j].dataValues.Recipe.dataValues.RecipeName;
              var Calories = parseInt(data2[j].dataValues.Ingredient.dataValues.Calories) * parseInt(data2[j].Amount);
              var Carbs = parseInt(data2[j].dataValues.Ingredient.dataValues.Carbs) * parseInt(data2[j].Amount);
              var Sugar = parseInt(data2[j].dataValues.Ingredient.dataValues.Sugar) * parseInt(data2[j].Amount);
              var Fat = parseInt(data2[j].dataValues.Ingredient.dataValues.Fat) * parseInt(data2[j].Amount);
              var Protein = parseInt(data2[j].dataValues.Ingredient.dataValues.Protein) * parseInt(data2[j].Amount);
              totalCaloriesSmall += Calories;
              totalCarbsSmall += Carbs;
              totalSugarSmall += Sugar;
              totalFatSmall += Fat;
              totalProteinSmall += Protein;
            }
            else if (size === "md") {
              var RecipeId = data2[j].dataValues.Recipe.dataValues.id
              var RecipeName = data2[j].dataValues.Recipe.dataValues.RecipeName;
              var Calories = parseInt(data2[j].dataValues.Ingredient.dataValues.Calories) * parseInt(data2[j].Amount);
              var Carbs = parseInt(data2[j].dataValues.Ingredient.dataValues.Carbs) * parseInt(data2[j].Amount);
              var Sugar = parseInt(data2[j].dataValues.Ingredient.dataValues.Sugar) * parseInt(data2[j].Amount);
              var Fat = parseInt(data2[j].dataValues.Ingredient.dataValues.Fat) * parseInt(data2[j].Amount);
              var Protein = parseInt(data2[j].dataValues.Ingredient.dataValues.Protein) * parseInt(data2[j].Amount);
              totalCaloriesMedium += Calories;
              totalCarbsMedium += Carbs;
              totalSugarMedium += Sugar;
              totalFatMedium += Fat;
              totalProteinMedium += Protein;
            }
            else if (size === "lg") {
              var RecipeId = data2[j].dataValues.Recipe.dataValues.id
              var RecipeName = data2[j].dataValues.Recipe.dataValues.RecipeName;
              var Calories = parseInt(data2[j].dataValues.Ingredient.dataValues.Calories) * parseInt(data2[j].Amount);
              var Carbs = parseInt(data2[j].dataValues.Ingredient.dataValues.Carbs) * parseInt(data2[j].Amount);
              var Sugar = parseInt(data2[j].dataValues.Ingredient.dataValues.Sugar) * parseInt(data2[j].Amount);
              var Fat = parseInt(data2[j].dataValues.Ingredient.dataValues.Fat) * parseInt(data2[j].Amount);
              var Protein = parseInt(data2[j].dataValues.Ingredient.dataValues.Protein) * parseInt(data2[j].Amount);
              totalCaloriesLarge += Calories;
              totalCarbsLarge += Carbs;
              totalSugarLarge += Sugar;
              totalFatLarge += Fat;
              totalProteinLarge += Protein;
            }
          }
          var totals = {
            RecipeId: RecipeId,
            RecipeName: RecipeName,
            small: {
              totalCalories: totalCaloriesSmall,
              totalCarbs: totalCarbsSmall,
              totalSugar: totalSugarSmall,
              totalFat: totalFatSmall,
              totalProtein: totalProteinSmall
            },
            medium: {
              totalCalories: totalCaloriesMedium,
              totalCarbs: totalCarbsMedium,
              totalSugar: totalSugarMedium,
              totalFat: totalFatMedium,
              totalProtein: totalProteinMedium
            },
            large: {
              totalCalories: totalCaloriesLarge,
              totalCarbs: totalCarbsLarge,
              totalSugar: totalSugarLarge,
              totalFat: totalFatLarge,
              totalProtein: totalProteinLarge
            }
          }

          totalsArr.push(totals);

          if (totalsArr.length === data.length) {
            callback();
          }
        });
    }

  };
}

exports.addRecipe = function (req, res) {
  console.log(req.body);
  db.Recipe.create({
    RecipeName: req.body.RecipeName,
    RecipeDescription: req.body.RecipeDescription
  }).then(function (newRecipe) {
    var promises = [];
    for (var i = 0; i < req.body.RecipeIngredients.length; i++) {
      var RecipeId = newRecipe.dataValues.id;
      promises.push(
        db.RecipeAmount.create({
          Amount: req.body.RecipeIngredients[i].AmountForSmall,
          Size: 'sm',
          Type: 'smoothie',
          IngredientId: req.body.RecipeIngredients[i].IngredientId,
          RecipeId: RecipeId
        })
      );

      promises.push(
        db.RecipeAmount.create({
          Amount: req.body.RecipeIngredients[i].AmountForMedium,
          Size: 'md',
          Type: 'smoothie',
          IngredientId: req.body.RecipeIngredients[i].IngredientId,
          RecipeId: RecipeId
        })
      );

      promises.push(
        db.RecipeAmount.create({
          Amount: req.body.RecipeIngredients[i].AmountForLarge,
          Size: 'lg',
          Type: 'smoothie',
          IngredientId: req.body.RecipeIngredients[i].IngredientId,
          RecipeId: RecipeId
        })
      );
    }

    sequelize.Promise.all(promises).then(function () {
      console.log('All done YAYYYYYYY!!!!!!!');
    });

  });



};


exports.deleteRecipe = function (req, res) {
  var promises = {
    recipeAmountDestroy: db.RecipeAmount.destroy({
      where: {
        RecipeId: req.params.id
      }
    }),
    recipeDestroy: db.Recipe.destroy({
      where: {
        id: req.params.id
      }
    })
  };

  sequelize.Promise.props(promises).then(function (results) {
    /// each promise is resolved here, results:
    results.recipeAmountDestroy;
    results.recipeDestroy;
  });
};


exports.editRecipe = function (req, res) {
  db.Recipe.update(
    req.body,
    {
      where: {
        id: req.body.id
      }
    }).then(function () {
      res.redirect('/recipes');
    });
};
