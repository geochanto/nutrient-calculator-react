
var express = require('express');
var router  = express.Router();
const multer  = require('multer');
const uuidv4 = require('uuid/v4');
const path = require("path");
var Recipes_controllers = require('../controllers/Recipes_controllers');
var isAuthenticated = require("../config/middleware/isAuthenticated");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (process.env.NODE_ENV === "production") {
      cb(null, './client/build/uploads');
    }
    else {
    cb(null, './client/public/uploads');
    }
  },
  filename: function (req, file, cb) {
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    // cb(null, file.fieldname + '-' + Date.now());
    cb(null, newFilename);
  }
})

   
const upload = multer({ storage: storage });

router.get('/', Recipes_controllers.viewRecipes);

router.get('/:id', Recipes_controllers.getOneRecipe)

router.post('/new', upload.single('selectedFile'), Recipes_controllers.addRecipe);

router.put('/edit/:id', upload.single('selectedFile'), Recipes_controllers.editRecipe);

router.delete('/delete/:id', Recipes_controllers.deleteRecipe);

module.exports = router;