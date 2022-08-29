import React, { useState } from 'react';
import PropTypes from 'prop-types';
import QuestionsContext from './QuestionsContext';

export default function QuestionsContextProvider({ children }) {
  const [questions, setQuestions] = useState([]);

  const data = {
    questions,
    setQuestions,
  };

  return (
    <div>
      <QuestionsContext.Provider value={ data }>
        { children }
      </QuestionsContext.Provider>
    </div>
  );
}

QuestionsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};