const mongoose = require('mongoose');
// Result Schema
const ResultSchema = mongoose.Schema({
    classId: { 
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    algorithmName: {
        type: String,
        required: true
    },
    result: {
        type: Number,
        required: true
    }
});

const Result = module.exports = mongoose.model('Result', ResultSchema);

module.exports.getResultByClassId = (classId, callback) => {
    Result.findMany(classId, callback);
}

module.exports.getResultByStudentId = (studentId, callback) => {
    Result.findMany(studentId, callback);
}

module.exports.getResultByStudentIdAndAlgorithmName = (studentId, algorithmName, callback) => {
    const query = { studentId, algorithmName };
    Result.findMany(query, callback);
}

module.exports.getResultByClassIdAndAlgorithmName = (classId, algorithmName, callback) => {
    const query = { classId, algorithmName };
    Result.findMany(query, callback);
}

module.exports.addResults = (studentId, classId, algorithmName, result, callback) => {
    const query = { studentId, classId, algorithmName };
    const update = { result };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    Result.findOneAndUpdate(query, update, options, callback);
}

module.exports.getResultByClass = (classId, callback) => {
    const query = { classId };
    Result.deleteMany(query, callback);
}
