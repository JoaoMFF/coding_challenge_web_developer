const dbConnection = require('../../../database/connection');

module.exports = async function drop() {
    if (process.env.NODE_ENV === "test") {
        await dbConnection.dropDatabase();
    }
}
