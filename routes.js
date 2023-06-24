
const express = require('express');
const router = express.Router();
const QuizController = require('./controllers/QuizController.js')

router.post('/uploadQuiz', QuizController.uploadQuiz)
router.post('/logRequest', QuizController.logRequest)
router.get('/quiz/:id', QuizController.getQuiz)
router.get('/quizzes', QuizController.getAllQuizzes)

module.exports = router;