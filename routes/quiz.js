const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Quiz = require('../models/quiz');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const authenticate = require('../middleware/auth');
const ObjectId = require('mongodb').ObjectId;

router.get('/getQuizByAlgorithm', async (req, res, next) => {
    console.log(req.query.algorithm)
    Quiz.getQuizByAlgorithm(req.query.algorithm, (err, result) => {
        if (err) {
            console.log(err)
            res.json({ success: false, msg: 'Failed to fetch questions!'})
        } else {    
            res.status(201).json(result)
        }
    });
});

router.post('/addQuestion', async (req, res, next) => {
    const question = req.body.question;
    const options = req.body.options;
    const answer = req.body.answer;
    const algorithm = req.body.algorithm;
    const array = req.body.array;
    Quiz.addQuestionToAlgorithm(algorithm, {
        array: array,
        question: question,
        options: options,
        answer: answer
      }, (err, result) => {
        if (err) {
          console.error(err);
          res.json({ success: false, msg: 'Failed to add question!'})
        } else {
            res.status(201).json(result)
        }
      });
});

module.exports = router;