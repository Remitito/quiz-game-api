const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const Quiz = require('../models/Quiz');

exports.uploadQuiz = async function (req, res) {
  const title = req.body.title
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
        questions
      });

      // Save the quiz to MongoDB
      await newQuiz.save();

      console.log('Quiz saved successfully');
      res.sendStatus(200);
    } catch (error) {
      console.error('Error saving quiz:', error);
      res.sendStatus(500);
    }
};

exports.getQuiz = async function (req, res) {
  const quizId = req.params.id;
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

exports.getAllQuizzes = async function (req, res) {
  try {
    // Fetch all quizzes from the database
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.sendStatus(500);
  }
}


exports.logRequest = async function (req, res) {
  let form = new multiparty.Form()
  form.parse(req, function(err, fields, files) {
    Object.keys(fields).forEach(function(name) {
      const value = fields[name][0]
      console.log('got field named ' + name + 'with value' + value);
      });
  });
  res.sendStatus(200); // Send a response indicating success
}