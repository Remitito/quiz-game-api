const express = require('express');
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path');
const Quiz = require('../models/Quiz');

exports.uploadQuiz = async function (req, res) {
  const title = req.body.title;
  const questions = req.body.questions.map((questionData, index) => {
    return {
      prompt: questionData.prompt,
      answer: questionData.answer,
      type: questionData.type,
    };
  });

  try {
    // Create a new Quiz document
    const newQuiz = new Quiz({
      title,
      questions,
    });

    // Save the quiz to MongoDB
    const savedQuiz = await newQuiz.save();

    console.log('Quiz saved successfully');
    console.log('Quiz ID:', savedQuiz._id); // Access the saved quiz's object ID

    res.status(200).json({ quizId: savedQuiz._id }); // Return the quiz ID as a response
  } catch (error) {
    console.error('Error saving quiz:', error);
    res.sendStatus(500);
  }
};

exports.getUserQuiz = async function (req, res) {
  const quizId = req.query.id;
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error retrieving quiz:', error);
    res.status(500).json({ message: 'Error retrieving quiz' });
  }
}

exports.getUserQuizNames = async function (req, res) {
  try {
    const quizzes = await Quiz.find();
    const idAndTitle = [] // id for loading the quiz, title for showing the list of quizzes
    quizzes.forEach((quiz) => {
      idAndTitle.push({id: quiz.id, name: quiz.title})
    })
    res.send(idAndTitle);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.sendStatus(500);
  }
}

// exports.logRequest = async function (req, res) {
//   let form = new multiparty.Form()
//   form.parse(req, function(err, fields, files) {
//     Object.keys(fields).forEach(function(name) {
//       const value = fields[name][0]
//       console.log('got field named ' + name + 'with value' + value);
//       });
//   });
//   res.sendStatus(200); // Send a response indicating success
// }