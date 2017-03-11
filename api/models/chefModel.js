import mongoose from 'mongoose';
import bluebird from 'bluebird';

const chefSchema = mongoose.Schema({
    name: String,
    lastName:String
});

mongoose.Promise = bluebird;
export default mongoose.model('Chef', chefSchema);
