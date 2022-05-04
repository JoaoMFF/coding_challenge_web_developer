const express = require('express')
const dotenv = require("dotenv")
const {initialize} = require("express-openapi");
const swaggerUi = require("swagger-ui-express");
const openapiValidationErrorMiddleware = require('./api/middleware/validation-error-middleware');

dotenv.config()

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