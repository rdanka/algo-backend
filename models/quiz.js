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
                  questions: [
                    {
                      array: [3,1,6,2,9],
                      question: "What is the first element that will be sorted during bubble sort on the given array?",
                      options: ["1","2","3","6"],
                      answer: "1",
                      _id: mongoose.Types.ObjectId(),
                    },
                    {
                      array: [],
                      question: "What is the worst-case time complexity of bubble sort?",
                      options: ["O(n)","O(n log n)","O(n^2)","O(2^n)"],
                      answer: "O(n^2)",
                      _id: mongoose.Types.ObjectId(),
                    },
                    {
                      array: [ 5, 2, 8, 3, 9],
                      question: "After one pass of bubble sort on the given array, what is the new position of the largest element?",
                      options: [ "First position", "Second position", "Third position", "Fifth position"],
                      answer: "Fifth position",
                      _id: mongoose.Types.ObjectId(),
                    },
                    {
                      array: [4,1,7,3,9],
                      question: "How many passes of bubble sort are needed to completely sort the given array?",
                      options: [ "1", "2", "3", "4"],
                      answer: "3",
                      _id: mongoose.Types.ObjectId(),
                    },
                    {
                      array: [],
                      question: "Which of the following is a true statement about bubble sort?",
                      options: [ "Bubble sort is an example of a divide-and-conquer sorting algorithm.", "Bubble sort is guaranteed to be the fastest sorting algorithm for small arrays.", "Bubble sort is stable.", "Bubble sort can only be used to sort arrays of integers."],
                      answer: "Bubble sort is stable.",
                      _id: mongoose.Types.ObjectId(),
                    }
                  ]
                });
              
                const quickQuiz = new Quiz({
                  algorithm: 'quick',
                  questions: [
                    {
                      array: [ 4, 7, 1, 9, 5, 2],
                      question: "What is the value of the element at index 3 after the Quick Sort algorithm is applied to the given array?",
                      options: [ "1", "5", "7", "9"],
                      answer: "5",
                      _id: mongoose.Types.ObjectId()
                    },
                    {
                      array: [ 7, 3, 9, 2, 6, 1],
                      question: "What is the pivot element after the second partitioning of the given array using the Quick Sort algorithm?",
                      options: [ "1", "2", "3", "6"],
                      answer: "2",
                      _id: mongoose.Types.ObjectId()
                    },
                    {
                      array: [ 8, 2, 4, 5, 7, 6],
                      question: "What is the final position of the element with value 5 after the Quick Sort algorithm is applied to the given array?",
                      options: ["1","2","3","4"],
                      answer: "2",
                      _id: mongoose.Types.ObjectId()
                    },
                    {
                      array: [5,9,3,7,2,1],
                      question: "What is the total number of comparisons made when sorting the given array using the Quick Sort algorithm?",
                      options: [ "16", "18", "20", "22"],
                      answer: "16",
                      _id: mongoose.Types.ObjectId()
                    },
                    {
                      array: [ 2, 6, 3, 8, 5, 1],
                      question: "What is the pivot element after the first partitioning of the given array using the Quick Sort algorithm?",
                      options: ["2","3","5","8"],
                      answer: "3",
                      _id: mongoose.Types.ObjectId()
                    }
                  ]
                });
              
                const selectionQuiz = new Quiz({
                  algorithm: 'selection',
                  questions: [
                    {
                      array: [8,3,6,1,9],
                      question: "What is the first element to be swapped during selection sort on the given array?",
                      options: [ "1", "3", "6", "8"],
                      answer: "8",
                      _id: mongoose.Types.ObjectId()
                    },
                    {
                      array: [5,2,7,1,9],
                      question: "Given the array [5, 2, 7, 1, 9], how many total comparisons will be made during the execution of selection sort?",
                      options: ["10","12","14","16"],
                      answer: "14",
                      _id: mongoose.Types.ObjectId()
                    },
                    {
                      array: [],
                      question: "Which of the following is a true statement about selection sort?",
                      options: ["Selection sort has a worst-case time complexity of O(n^2).","Selection sort is always more efficient than merge sort.","Selection sort works by swapping adjacent elements.","Selection sort can only be used to sort integer arrays."],
                      answer: "Selection sort has a worst-case time complexity of O(n^2).",
                      _id: mongoose.Types.ObjectId()
                    },
                    {
                      array: [6,2,9,1,7],
                      question: "For the given array, at what index is the first swap made during selection sort?",
                      options: ["Index 0","Index 1","Index 2","Index 3"],
                      answer: "Index 1",
                      _id: mongoose.Types.ObjectId()
                    },
                    {
                      array: [],
                      question: "What is the worst-case time complexity of selection sort?",
                      options: ["O(n)","O(n log n)","O(n^2)","O(2^n)"],
                      answer: "O(n^2)",
                      _id: mongoose.Types.ObjectId()
                    },
                    {
                      array: [],
                      question: "In a selection sort structure, there is/are?",
                      options: [ "Two separate for loops", "Three for loops, all separate", "Two for loops, one nested in the other", "A for loop nested inside a while loop"],
                      answer: "Two for loops, one nested in the other",
                      _id: mongoose.Types.ObjectId()
                    }
                  ]
                });
              
                const mergeQuiz = new Quiz({
                  algorithm: 'merge',
                  questions: [
                    {
                      array: [4,2,6,3,7],
                      question: "What is the first element in the sorted array using merge sort on the given array?",
                      options: [ "2", "3", "4", "6"],
                      answer: "2",
                      _id: mongoose.Types.ObjectId()
                    },
                    {
                      array: [ 9, 5, 3, 7, 1],
                      question: "What is the final array after sorting using merge sort on the given array?",
                      options: [ "[1, 3, 5, 7, 9]", "[9, 7, 5, 3, 1]", "[3, 5, 1, 9, 7]", "[7, 3, 1, 5, 9]"],
                      answer: "[1, 3, 5, 7, 9]",
                      _id: mongoose.Types.ObjectId()
                    },
                    {
                      array: [6,8,2,4,1],
                      question: "What is the time complexity of merge sort?",
                      options: ["O(n)","O(log n)","O(n log n)","O(n^2)"],
                      answer: "O(n log n)",
                      _id: mongoose.Types.ObjectId()
                    },
                    {
                      array: [ 5, 2, 7, 1, 9],
                      question: "How many times does the recursive function call itself while sorting the given array using merge sort?",
                      options: [ "3", "4", "5", "6"],
                      answer: "4",
                      _id: mongoose.Types.ObjectId()
                    },
                    {
                      array: [ 3, 1, 7, 5, 2],
                      question: "What is the first swap made while sorting the given array using merge sort?",
                      options: ["[1, 3]","[3, 7]","[7, 5]","[5, 2]"],
                      answer: "[1, 3]",
                      _id: mongoose.Types.ObjectId()
                    },
                    {
                      array: [20,47,15,8,9,4,40,30,12,17],
                      question: "What is the order of the elements after the second pass of the algorithm?",
                      options: ["8, 9, 15, 20, 47, 4, 12, 17, 30, 40","8, 15, 20, 47, 4, 9, 30, 40, 12, 17","15, 20, 47, 4, 8, 9, 12, 30, 40, 17","4, 8, 9, 15, 20, 47, 12, 17, 30, 40"],
                      answer: "8, 15, 20, 47, 4, 9, 30, 40, 12, 17",
                      _id: mongoose.Types.ObjectId()
                    }
                  ]
                });
              
                Quiz.insertMany([bubbleQuiz, quickQuiz, selectionQuiz, mergeQuiz], (err, docs) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.info('Quizzes initialized successfully');
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
          console.info('Question added successfully');
          callback(null, result);
        }
      }
    );
  };