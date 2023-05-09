const quizController = require('../controllers/quizController.js');
const express = require('express');
const router = express.Router();

router.get('/getQuizByAlgorithm', quizController.getQuizByAlgorithm);
router.post('/addQuestion', quizController.addQuestion);

module.exports = router;