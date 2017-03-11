import mongoose from 'mongoose';
import bluebird from 'bluebird';

const categorySchema = mongoose.Schema({
    name: String
});

mongoose.Promise = bluebird;
export default mongoose.model('Category', categorySchema);
