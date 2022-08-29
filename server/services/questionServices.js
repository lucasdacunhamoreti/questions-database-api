const questionModel = require('../models/questionModel');

async function questionRegister({ theme, statement, alternatives }) {
  await questionModel.questionRegister({ theme, statement, alternatives });
}

async function getAllQuestions() {
  const questions = await questionModel.getAllQuestions();
  return { data: questions, code: 200 };
}

async function deleteQuestions(id) {
  await questionModel.deleteQuestions(id);
}

async function getQuestionById(id) {
  const question = await questionModel.getQuestionById(id);
  return { data: question, code: 200 };
}

async function editQuestion({ theme, statement, alternatives, id }) {
  await questionModel.editQuestion({ theme, statement, alternatives, id });
}

module.exports = {
  questionRegister,
  getAllQuestions,
  deleteQuestions,
  getQuestionById,
  editQuestion
}