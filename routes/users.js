const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const authenticate = require('../middleware/auth');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ succes: false, msg: 'Failed to register!'})
        } else {
            res.status(201).json({ succes: true, msg: 'User registered!'})
        }
    });
});

router.get('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found!'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const accesstoken = jwt.sign(user.toJSON(), process.env.ACCES_TOKEN_SECRET, { expiresIn: '20m' });
                res.json({
                    success: true,
                    accessToken: `JWT ${accesstoken}`,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.status(401).json({success: false, msg: 'Wrong password!'})
            }
        });
    });
});

router.get('/profile', authenticate,  (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;