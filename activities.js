const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitiesSchema = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        activityType: {
            type: String,
        },
    }
)

const activitiesModel = mongoose.model('Activities', activitiesSchema);

module.exports = {
    activitiesModel
}