module.exports = function (query) {
    return (query.page - 1) * query.limit;
}