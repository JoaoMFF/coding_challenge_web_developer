const drop = require('./drop');
const Questions = require('../../../database/models/question');
const {faker} = require("@faker-js/faker");


module.exports = async function init() {
    await drop().then(async () => {
        let questions = [];

        for (let i = 0; i <= 4; i++) {
            let firstName = faker.name.firstName();
            let lastName = faker.name.lastName();

            questions.push(
                {
                    name: `${firstName} ${lastName}`,
                    email: faker.internet.email(firstName, lastName),
                    observations: faker.commerce.productDescription(),
                    date: faker.date.soon(),
                    created_at: new Date(),
                }
            )
        }

        await Questions.insertMany(questions);
    }).catch(error => console.log(error));
}
