const ValidationError = require('../errors/validation-error');


module.exports = function(err, req, res, next) {
    console.error(err);
    if(isValidationError(err)) {
        res.status(500).send(new ValidationError(err.status, err.errors));
    } else if(err.status) {
        res.status(err.status).send(err);
    } else {
        res.status(500).send(err);
    }
};

function isValidationError(err) {
    return typeof err === 'object' &&
        typeof err.status === 'number' &&
        Array.isArray(err.errors) &&
        err.errors.every(e => typeof e.errorCode === 'string') &&
        err.errors.every(e => e.errorCode.endsWith('openapi.validation'));
}
