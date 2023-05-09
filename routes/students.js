const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentsController');

router.post('/login', studentController.login);

module.exports = router;