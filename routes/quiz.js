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

/* question: 'What is the first step of the bubble sort algorithm?',
options: ['Compare the first two elements', 'Compare the last two elements', 'Compare the middle two elements', 'Compare all adjacent elements'],
answer: 'Compare the first two elements' */

/*
{
  array: [3, 7, 1, 9, 2],
  question: "What is the final array after two passes of selection sort on the given array?",
  options: [
    "[1, 2, 3, 7, 9]",
    "[2, 1, 3, 7, 9]",
    "[1, 2, 3, 9, 7]",
    "[3, 1, 2, 7, 9]"
  ],
  answer: "[1, 2, 3, 9, 7]"
}
*/