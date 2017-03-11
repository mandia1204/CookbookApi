import Category from '../models/categoryModel.js';

/* eslint-disable no-console */

const categoryRoutes = (app) => {

  /* CREATE */
  app.post('/category', (req, res) => {
      const newObj = new Category(req.body);
      newObj.save((err) => {
          if (err) res.json({info: 'error during category create', error: err});

          res.json({info: 'category created successfully', data: newObj});
      });
  });

  /* READ CATEGORIES */
  app.get('/category', (req, res) => {
    const promise = Category.find().sort({ name: "asc"}).exec();

    promise.then((categories)=>{
      res.json({info: 'categories found successfully', data: categories});
    }).catch((err)=>{
      res.json({info: 'error during find categories', error: err});
    });
  });
};

export default categoryRoutes;
