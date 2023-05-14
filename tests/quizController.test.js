const app = require('../rest');
const supertest = require('supertest');
const mongoose = require('mongoose');

describe('QuizController', () => {
    beforeAll(done => {
        done()
    });
    
    afterAll(done => {
        mongoose.connection.close()
        done()
    });

    describe('getQuizByAlgorithm', () => {
        test('should respond with 201 status code', async () => { 
            const response = await supertest(app).get('/quiz/getQuizByAlgorithm?algorithm=bubble');
            expect(response.statusCode).toBe(201);
        })
    });
});


