const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Class = require('../models/class');

// User Schema

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true
    },
    classes: {
        type: [Class.schema],
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);
module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
    const query = { username: username };
    User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = (password, hash,  callback) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.addClass = async (userId, students) => {
    try {
        const teacher = await User.findById(userId);
        if (!teacher) return null;
        teacher.classes.push(students);
        return teacher.save();
    } catch (err) {
        throw err;
    }
} 

module.exports.getClassIdByClassName = async (className) => { 
    const classId = await User.findOne({ 'classes': { $elemMatch: { 'className': className } } }, { 'classes.$': 1 });
    return classId.classes[0]._id;
}