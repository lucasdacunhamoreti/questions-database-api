const connection = require('./connection');

async function questionRegister({ theme, statement, alternatives }) {
  const [response] = await connection.execute(
    'INSERT INTO questions (theme, statement) VALUES (?, ?)',
    [theme, statement],
  );

  alternatives.forEach(async ({ isCorrect, description }) => {
    await connection.execute(
      'INSERT INTO alternatives (id_statement, description, isCorrect) VALUES (?, ?, ?)',
      [response.insertId, description, isCorrect],
    );
  });
}

async function getAllQuestions() {
  const [questions] = await connection.execute(
    'SELECT id, theme, statement FROM questions',
  );
  return questions;
}

async function deleteQuestions(id) {
  await connection.execute('DELETE FROM alternatives WHERE id_statement = ?', [
    id,
  ]);
  await connection.execute('DELETE FROM questions WHERE id = ?', [
    id,
  ]); 
}

async function getQuestionById(id) {
  const [question] = await connection.execute(
    'SELECT theme, statement FROM questions WHERE id = ?',
    [id],
  );
  const [alternatives] = await connection.execute(
    'SELECT description, isCorrect FROM alternatives WHERE id_statement = ?',
    [id],
  );

  const completeQuestion = { question, alternatives, }
  return completeQuestion;
}

async function editQuestion({ theme, statement, alternatives, id }) {
  await connection.execute(
    'DELETE FROM alternatives WHERE id_statement = ?',
    [id],
  );

  await connection.execute(
    'DELETE FROM questions WHERE id = ?',
    [id],
  );

  const [{ insertId }] = await connection.execute(
    'INSERT INTO questions (theme, statement) VALUES (?, ?)',
    [theme, statement],
  );

  alternatives.forEach(async ({ isCorrect, description }) => {
    await connection.execute(
      'INSERT INTO alternatives (id_statement, description, isCorrect) VALUES (?, ?, ?)',
      [insertId, description, isCorrect],
    );
  });
}

module.exports = {
  questionRegister,
  getAllQuestions,
  deleteQuestions,
  getQuestionById,
  editQuestion
}