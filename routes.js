
const express = require('express');
const router = express.Router();
const QuizController = require('./controllers/QuizController.js');
const Quiz = require('./models/Quiz.js');
router.post('/uploadQuiz', QuizController.uploadQuiz)
// router.post('/logRequest', QuizController.logRequest)
router.get('/names/user', QuizController.getUserQuizNames)
router.get('/quiz/user', QuizController.getUserQuiz)

module.exports = router;