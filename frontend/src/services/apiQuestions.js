export const getAllQuestions = async () => {
  const response = await fetch(`http://localhost:3001/questions`);
  const data = await response.json();
  return data;
}

export const getOneQuestion = async (id) => {
  const response = await fetch(`http://localhost:3001/questions/${id}`);
  const data = await response.json();
  return data;
}

export const deleteQuestion = async (id) => {
  await fetch(`http://localhost:3001/questions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}