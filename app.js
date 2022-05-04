const express = require('express')
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const {initialize} = require("express-openapi");
const swaggerUi = require("swagger-ui-express");
const openapiValidationErrorMiddleware = require('./api/middleware/validation-error-middleware');

dotenv.config()

mongoose.connect('mongodb://' + process.env.DB_URL + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    authSource: process.env.DB_AUTH_SOURCE,
})
mongoose.Promise = global.Promise;

const port = process.env.PORT || 3000;
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}));

initialize({
    app,
    apiDoc: "./api/openapi.yaml",
    paths: "./api/paths",
});

app.use(
    "/api-documentation",
    swaggerUi.serve,
    swaggerUi.setup(null, {
        swaggerOptions: {
            url: `http://localhost:${port}/api-docs`,
        },
    }),
);

app.use(openapiValidationErrorMiddleware);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

module.exports = app;