const express = require('express');
require('express-async-errors');
const app = require('./app');

const cors = require('cors');
app.use(cors());

require('dotenv').config();

app.use(express.json());

const questionControllers = require('./controllers/questionControllers');

app.put('/question/edit/:id', questionControllers.editQuestion);
app.post('/questions/register', questionControllers.questionRegister);
app.get('/questions/:id', questionControllers.getQuestionById);
app.get('/questions', questionControllers.getAllQuestions);
app.delete('/questions/:id', questionControllers.deleteQuestions);

app.use((err, _req, res, _next) => {
  res.status(500).json({ erro: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
