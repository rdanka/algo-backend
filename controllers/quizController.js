// Quiz Controller
const Quiz = require('../models/quiz');

module.exports.getQuizByAlgorithm =  async (req, res, next) => { // bubble, selection, quick ,merge
    Quiz.getQuizByAlgorithm(req.query.algorithm, (err, result) => {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: 'Failed to fetch questions!'})
        } else {    
            res.status(201).json(result)
        }
    });
}

module.exports.addQuestion = async (req, res, next) => {
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
}
