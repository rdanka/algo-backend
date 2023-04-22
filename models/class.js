const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

// Class Schema
const ClassSchema = mongoose.Schema({
    className: {
        type: String,
        required: true
    },
    teacherId: {
        type: ObjectId,
        required: true
    },
    studentIds: { 
        type: [String],
        required: true
    }
});

const Class = module.exports = mongoose.model('Class', ClassSchema);

module.exports.getClassById = (id, callback) => {
    Class.findById(id, callback);
}

module.exports.getClassByName = (username, callback) => {
    const query = { username: username };
    Class.findOne(query, callback);
}

