import Chef from '../models/chefModel.js';

/* eslint-disable no-console */

const chefRoutes = (app) => {

  /* CREATE */
  app.post('/chef', (req, res) => {
      const newObj = new Chef(req.body);
      newObj.save((err) => {
          if (err) res.json({info: 'error during chef create', error: err});

          res.json({info: 'chef created successfully', data: newObj});
      });
  });

  /* READ ALL */
  app.get('/chef', (req, res) => {
    const promise = Chef.find().sort({ name: "asc"}).exec();

    promise.then((chefs)=>{
      res.json({info: 'categories found successfully', data: chefs});
    }).catch((err)=>{
      res.json({info: 'error during find categories', error: err});
    });
  });
};

export default chefRoutes;
