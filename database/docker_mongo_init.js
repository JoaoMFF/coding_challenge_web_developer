const mongoose = require('mongoose');
const Question = require('./models/question');
const dotenv = require("dotenv")

dotenv.config()

mongoose.connect('mongodb://' + process.env.DB_URL + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    authSource: process.env.DB_AUTH_SOURCE,
})
mongoose.Promise = global.Promise;


const seedQuestions = [
    {
        name: 'John',
        email: 'john@email.com',
        observations: 'sup?',
        date: new Date('2022-05-02'),
        created_at: new Date(),
    }
]

const seedDB = async () => {
    await Question.deleteMany({});
    await Question.insertMany(seedQuestions);
}

seedDB().then(() => {
    console.log('DB populated!')
    mongoose.connection.close();
})