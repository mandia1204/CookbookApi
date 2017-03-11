import mongoose from 'mongoose';
import bluebird from 'bluebird';

const recipeSchema = mongoose.Schema({
    name: String,
    chef: String,
    category:String,
    url:String,
    recommended: { type: Boolean, default: false },
    ingredients: [ { name: String}]
});

mongoose.Promise = bluebird;
export default mongoose.model('Recipe', recipeSchema);
