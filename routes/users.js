const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const userController = require('../controllers/userController.js');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authenticate,  userController.profile);
router.get('/getAllClasses', authenticate, userController.getAllClasses);
router.post('/addClass', authenticate,  userController.addClass);

module.exports = router;