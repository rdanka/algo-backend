const User = require('../models/user');
const Class = require('../models/class');
const jwt = require('jsonwebtoken');

module.exports.register = (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        classes: []
    });

    User.getUserByUsername(req.body.username, (err, user) => {
        if (err) console.error(err)
        if (user) return res.status(400).json({success: false, msg:'Username already taken!'});
        else {
            User.addUser(newUser, (err, user) => {
                if (err) {
                    console.error(err)
                    res.json({ success: false, msg: 'Failed to register!'})
                } else {
                    res.status(201).json({ success: true, msg: 'User registered!'})
                }
            });
        }
    });   
}

module.exports.login = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.status(400).json({success: false, msg: 'User not found!'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const accesstoken = jwt.sign(user.toJSON(), process.env.ACCES_TOKEN_SECRET, { expiresIn: '60m' });
                res.json({
                    success: true,
                    accessToken: `JWT ${accesstoken}`,
                    user: {
                        id: user._id,
                        username: user.username,
                    }
                })
            } else {
                return res.status(401).json({success: false, msg: 'Wrong password!'})
            }
        });
    });
};

module.exports.profile = (req, res, next) => {
    res.json({user: req.user});
};

module.exports.getAllClasses = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate('classes');
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      const classes = user.classes;
      res.status(200).json({ success: true, classes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports.addClass = (req, res, next) => {
    res.json({user: req.user});
    let newClass = new Class({
        className: req.body.className,
        studentIds: req.body.studentList
    });
    User.addClass(req.user._id, newClass, (err, user) => {
        if (err) {
            res.status(401).json({ success: false, msg: 'Failed to add Class!'})
        } else {
            res.status(201).json({ success: true, msg: 'Class added!'})
        }
    })
}