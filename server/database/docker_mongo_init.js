const mongoose = require('mongoose');
const Question = require('./models/question');
const dotenv = require("dotenv")
const { faker } = require('@faker-js/faker');

dotenv.config({path: '../.env'})

mongoose.connect('mongodb://' + process.env.DB_URL + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    authSource: process.env.DB_AUTH_SOURCE,
})
mongoose.Promise = global.Promise;


let seedQuestions = []

for (let i = 0; i <= 50; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();

    seedQuestions.push(
        {
            name: `${firstName} ${lastName}`,
            email: faker.internet.email(firstName, lastName),
            observations: faker.commerce.productDescription(),
            date: faker.date.soon(),
            created_at: new Date(),
        }
    )
}

const seedDB = async () => {
    await Question.deleteMany({});
    await Question.insertMany(seedQuestions);
}

seedDB().then(() => {
    console.log('DB populated!')
    mongoose.connection.close();
})