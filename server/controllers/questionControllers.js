const questionServices = require('../services/questionServices');

async function questionRegister(req, res) {
  await questionServices.questionRegister(req.body);
  return res.status(201).json();
}

async function getAllQuestions(_req, res) {
  const { data, code } = await questionServices.getAllQuestions();
  return res.status(code).json(data);
}

async function deleteQuestions(req, res) {
  const { id } = req.params;
  await questionServices.deleteQuestions(id);
  return res.status(204).json();
}

async function getQuestionById(req, res) {
  const { id } = req.params;
  const { data, code } = await questionServices.getQuestionById(id);
  return res.status(code).json(data);
}

async function editQuestion(req, res) {
  await questionServices.editQuestion({
    ...req.body,
    ...req.params,
  });
  return res.status(204).json();
}

editQuestion
module.exports = {
  questionRegister,
  getAllQuestions,
  deleteQuestions,
  getQuestionById,
  editQuestion
}