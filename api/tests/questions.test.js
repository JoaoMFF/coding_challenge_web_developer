require('dotenv').config({path: '.env.testing'});
const request = require('supertest');
const app = require('../../app');
const dbInit = require('./utils/init');
const drop = require('./utils/drop');
const mongoose = require("mongoose");
const connection = require('../../database/connection');


describe('Questions Model Test', () => {
    beforeEach(async () => {
        await dbInit();
    });

    afterEach(async () => {
        await drop();
    });

    afterAll(() => {
        // Closing the DB connection allows Jest to exit successfully.
        mongoose.disconnect();
    })

    test('get questions should return 200', async () => {
        const res = await request(app).get('/questions');

        expect(res.status).toBe(200);
        expect(res.body.questions).toHaveLength(5);
    });

    test('get questions should return 200 and questions length should be 1 when a valid id is passed', async () => {
        let question = await connection.collection('questions').find({}).limit(1).toArray();

        const res = await request(app).get('/questions').query({id: question[0]._id.toString()});

        expect(res.status).toBe(200);
        expect(res.body.questions).toHaveLength(1);
    });

    test('get questions should return 200 and 3 questions when limit is 3', async () => {
        const res = await request(app).get('/questions').query({limit: 3});

        expect(res.status).toBe(200);
        expect(res.body.questions).toHaveLength(3);
    });

    test('get questions should return 204 when there are not enough question for page', async () => {
        const res = await request(app).get('/questions').query({page: 20});

        expect(res.status).toBe(204);
    });

    test('post questions should return 201', async () => {
        let oneDay = 1000 * 60 * 60 * 24
        let dateInTwoDays = new Date(new Date().getTime() + oneDay * 2);

        const res = await request(app).post('/questions')
            .send({
                name: 'test',
                email: 'test@email.com',
                observations: 'why test?',
                date: dateInTwoDays.toISOString().split('T')[0]
            });

        expect(res.status).toBe(201);
    });

    test('post questions should return 400 when date is not greater than tomorrow', async () => {
        const res = await request(app).post('/questions')
            .send({
                name: 'test',
                email: 'test@email.com',
                observations: 'why test?',
                date: new Date().toISOString().split('T')[0]
            });

        expect(res.status).toBe(400);
    });
})