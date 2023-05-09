const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const resultController = require('../controllers/resultController');

router.post('/add', resultController.addResult);
router.get('/getByStudentId', authenticate,  resultController.getResultsByStudentId);
router.get('/getByClassId', authenticate,  resultController.getResultsByClassId);

module.exports = router;