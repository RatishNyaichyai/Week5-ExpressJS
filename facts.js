const mongoose = require('mongoose');
const activitiesModel = require('./activities')

const Schema = mongoose.Schema;
// const { ObjectId } = mongoose.Schema.Types.ObjectId;


const factsSchema = new Schema(
    {
        facts: {
            type: String,
        },
        activitiesId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activities'
        }
    }
)

const factsModel = mongoose.model('Facts', factsSchema);

module.exports = {
    factsModel,
}