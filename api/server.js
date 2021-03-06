import express from 'express';
import path from 'path';
import open from 'open';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
/* eslint-disable no-console */
const options = { promiseLibrary: bluebird };
mongoose.connect('mongodb://localhost/recipes', options);

const port = 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

import recipeRoutes from './routes/recipeRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import chefRoutes from './routes/chefRoutes.js';

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

recipeRoutes(app);
categoryRoutes(app);
chefRoutes(app);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
