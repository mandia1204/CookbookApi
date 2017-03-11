import Recipe from '../models/recipeModel.js';

/* eslint-disable no-console */

const recipeRoutes = (app) => {

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
  });
  /* CREATE */
  app.post('/recipe', (req, res) => {
      const newRecipe = new Recipe(req.body);
      newRecipe.save((err) => {
          if (err) {
            res.json({info: 'error during recipe create', error: err});
          }else{
            res.json({info: 'recipe created successfully', data: newRecipe});
          }
      });
  });

  /* READ */
  app.get('/recipe', (req, res) => {
    const promise = Recipe.find().sort({ name: "asc"}).exec();

    promise.then((recipes)=>{
      res.json({info: 'recipes found successfully', data: recipes});
    }).catch((err)=>{
      res.json({info: 'error during find recipes', error: err});
    });
  });

  /* ONLY SALADS */
  app.get('/recipe/salads', (req, res) => {
    const promise = Recipe.find({'category':'Salads'}).sort({ name: "asc"}).exec();

    promise.then((recipes)=>{
      res.json({info: 'recipes found successfully', data: recipes});
    }).catch((err)=>{
      res.json({info: 'error during find recipes', error: err});
    });
  });

  /* ONLY PASTAS */
  app.get('/recipe/pastas', (req, res) => {
    const promise = Recipe.find({'category':'Pastas'}).sort({ name: "asc"}).exec();

    promise.then((recipes)=>{
      res.json({info: 'recipes found successfully', data: recipes});
    }).catch((err)=>{
      res.json({info: 'error during find recipes', error: err});
    });
  });

  /* READ BY ID */
  app.get('/recipe/:id', (req, res) => {
      Recipe.findById(req.params.id, (err, recipe) => {
          if (err) {
            res.json({info: 'error during find recipe', error: err});
            return;
          }

          if (recipe) {
            res.json({info: 'recipe found successfully', data: recipe});
          }else{
            res.json({info: 'recipe not found'});
          }
      });
  });

  /* UPDATE */
  app.put('/recipe/:id', (req, res) => {
      Recipe.findOneAndUpdate({ _id:req.params.id}, req.body, { new :true}, (err,recipe) =>{
        if (err){
          res.json({info: 'error during recipe update', error: err});
        }else{
          res.json({info: 'recipe updated successfully', data: recipe});
        }
      });
  });

  /* UPDATE DIRECTLY WITHOUT UPDATED DOC */
  app.put('/recipe', (req, res) => {
      Recipe.update({ _id:req.body._id}, req.body, (err, raw) => {
        if(err){
          res.json({info: 'error during update recipe', error: err});
        }else{
          res.json({info: 'recipe updated successfully', data: req.body});
        }
      });
  });

  /* DELETE */
  app.delete('/recipe/:id', (req, res) => {
      Recipe.findByIdAndRemove(req.params.id, (err) => {
          if (err){
            res.json({info: 'error during remove recipe', error: err});
          }else{
            res.json({info: 'recipe removed successfully'});
          }
      });
  });
};

export default recipeRoutes;
