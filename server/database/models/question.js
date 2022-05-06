const mongoose = require('mongoose');

const {Schema} = mongoose;

module.exports = mongoose.model('questions', new Schema(
    {
        _id: Schema.Types.ObjectId,
        name: String,
        email: String,
        observations: String,
        date: Date,
        created_at: Date,
    },
    { versionKey: false }
));
