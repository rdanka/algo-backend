const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Result = require('../models/result');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const authenticate = require('../middleware/auth');
const ObjectId = require('mongodb').ObjectId;

router.post('/add', async (req, res, next) => {

    let 
        studentId = req.body.studentId,
        algorithmName = req.body.algorithmName,
        result = req.body.result;

    let classId = await User.findOne({ 'classes': { $elemMatch: { 'studentIds': req.body.studentId } } }, { 'classes.$': 1 });
    Result.addResults(studentId, classId.classes[0]._id, algorithmName, result, (err, result) => {
        if (err) {
            console.log(err)
            res.json({ success: false, msg: 'Failed to save result!'})
        } else {
            res.status(201).json({ success: true, msg: 'Result saved!'})
        }
    });

});

router.get('/getByStudentId', authenticate,  (req, res, next) => {
    Result.find({studentId: req.query.studentId},(err, result) => {
        if (err) {
            console.log(err)
            res.json({ success: false, msg: 'Failed to save result!'})
        } else {
            res.status(201).json(result)
        }
    })
});


router.get('/getByClassId', authenticate,  async (req, res, next) => {
    const classId = await User.getClassIdByClassName(req.query.className);
    Result.find({classId},(err, result) => {
        if (err) {
            console.log(err)
            res.json({ success: false, msg: 'Failed to save result!'})
        } else {
            res.status(201).json(result)
        }
    })
});

module.exports = router;