const User = require('../models/user');
const Result = require('../models/result');
const authenticate = require('../middleware/auth');

module.exports.addResult = async (req, res, next) => { 
    let 
        studentId = req.body.studentId,
        algorithmName = req.body.algorithmName,
        result = req.body.result;

    let classId = await User.findOne({ 'classes': { $elemMatch: { 'studentIds': req.body.studentId } } }, { 'classes.$': 1 });
    Result.addResults(studentId, classId.classes[0]._id, algorithmName, result, (err, result) => {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: 'Failed to save result!'})
        } else {
            res.status(201).json({ success: true, msg: 'Result saved!'})
        }
    });
}

module.exports.getResultsByStudentId = (req, res, next) => {
    Result.find({studentId: req.query.studentId},(err, result) => {
        if (err) {
            console.error(err)
            res.status(400).json({ success: false, msg: 'Failed to find student!'})
        } else {
            res.status(201).json(result)
        }
    })
}

module.exports.getResultsByClassId = async (req, res, next) => {
    const classId = await User.getClassIdByClassName(req.query.className);
    Result.find({classId},(err, result) => {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: 'Failed to find class!'})
        } else {
            res.status(201).json(result)
        }
    })
}