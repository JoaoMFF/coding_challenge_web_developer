module.exports = class ValidationError extends Error {
    constructor(statusCode, openapiErrors) {
        super('Request validation failed');
        this.errorType = 'Request validation error';
        this.statusCode = statusCode;
        this.openapiErrors = openapiErrors;
    }

    toResponse() {
        return this.openapiErrors;
    }
};
