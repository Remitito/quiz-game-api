const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    prompt: String,
    answer: String,
    type: String,
    pictureId: {
      type: String,
      required: false
    }
  });
  
  // Define the quiz schema
  const quizSchema = new mongoose.Schema({
    title: String,
    questions: [questionSchema]
  });
  
  // Create the quiz model
  module.exports = Quiz = mongoose.model('Quiz', quizSchema);