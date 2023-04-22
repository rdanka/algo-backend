const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const QuestionSchema = mongoose.Schema({
    array: {
        type: [Number],
        required: false
    },
    question:{
        type:  String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

// Quiz Schema
const QuizSchema = mongoose.Schema({
    algorithm: {
        type: String,
        required: true
    },
    questions: [QuestionSchema],
});

const Quiz = module.exports = mongoose.model('Quiz', QuizSchema);

module.exports.getQuizById = (id, callback) => {
    Quiz.findById(id, callback);
}

module.exports.getQuizByAlgorithm = (algorithm, callback) => {
    const query = { algorithm };
    Quiz.findOne(query, callback);
}

module.exports.initialize = () => {
    Quiz.findOne({ algorithm: 'bubble' }, (err, result) => {
        if (result) {
            return;
        } else {
            const bubbleQuiz = new Quiz({
                algorithm: 'bubble',
                questions: []
              });
            
              const quickQuiz = new Quiz({
                algorithm: 'quick',
                questions: []
              });
            
              const selectionQuiz = new Quiz({
                algorithm: 'selection',
                questions: []
              });
            
              const mergeQuiz = new Quiz({
                algorithm: 'merge',
                questions: []
              });
            
              Quiz.insertMany([bubbleQuiz, quickQuiz, selectionQuiz, mergeQuiz], (err, docs) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log('Quizzes initialized successfully');
                }
              });
        }
    });
};

module.exports.addQuestionToAlgorithm = (algorithm, question, callback) => {
    Quiz.findOneAndUpdate(
      { algorithm: algorithm },
      { $push: { questions: question } },
      { new: true },
      (err, result) => {
        if (err) {
          console.error(err);
          callback(err, null);
        } else if (!result) {
          const errMessage = `Quiz with algorithm ${algorithm} not found`;
          console.error(errMessage);
          callback(new Error(errMessage), null);
        } else {
          console.log('Question added successfully');
          callback(null, result);
        }
      }
    );
  };