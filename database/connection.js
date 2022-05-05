const mongoose = require("mongoose");

module.exports = mongoose.createConnection('mongodb://' + process.env.DB_URL + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    authSource: process.env.DB_AUTH_SOURCE,
});