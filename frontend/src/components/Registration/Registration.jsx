import React, { useState, useEffect } from 'react'

import { Link } from "react-router-dom";

import { ImHome3 } from "react-icons/im";
import { AiFillCloseSquare } from "react-icons/ai";

import {
  Button,
  Text,
  Input,
  Textarea,
  useToast
} from '@chakra-ui/react';

import { 
  ContainerMain,
  ContainerForm,
  ContainerActionButtons,
  ContainerAlternatives,
  ContainerSecondary
} from './styles';

export default function Registration() {
  const [values, setValues] = useState();
  const [questionComplete, setQuestionComplete] = useState([]);
  const [addButtonDisable, setAddButtonDisable] = useState(true);
  const [registerButtonDisable, setRegisterButtonDisable] = useState(true);

  const toast = useToast();

  // This useEffect valid inputs and buttons on form
  useEffect(() => {
    const { alternatives } = questionComplete;

    if (values?.theme?.length >= 2 && values?.statement?.length >= 2 && values?.description?.length >= 1) {
      setAddButtonDisable(false);
    } else {
      setAddButtonDisable(true);
    }

    if (alternatives?.length >= 2) {
      setRegisterButtonDisable(false);
    } else {
      setRegisterButtonDisable(true);
    }
  }, [values, questionComplete]);

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  }

  // Clear inputs and alternatives on register
  const clearInputs = () => {
    const inputs = document.querySelectorAll('.input-text');
    inputs.forEach((input) => {
      input.value = '';
    });
    setQuestionComplete([]);
  }

  // Validates if any alternative is selected
  const handleCheckedAlternatives = () => {
    const radios = document.querySelectorAll('[type=radio]');
    const { alternatives } = questionComplete;
    return alternatives?.find((_element, index) => radios[index].checked);
  }

  // Show alerts on register or add alternatives
  const showMessages = (title, status) => {
    toast({
      title: title,
      status: status,
      isClosable: true,
    })
  }

  // Register a question
  const registerQuestion = async () => {
    if (!handleCheckedAlternatives()) {
      showMessages('You need to select an answer to register!', 'warning');
    } else {
      await fetch(`http://localhost:3001/questions/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionComplete),
      });
      clearInputs();
      setValues();
      showMessages('Question successfully registered!', 'success');
    }
  }

  const handleAddAlternatives = () => {
    const { alternatives } = questionComplete;

    if(alternatives?.some((alternative) => {
      // debugger;
      return alternative.description === values.description;
    })){
      showMessages('It is not possible to register a repeated or empty alternative!', 'warning');
    } else if (!alternatives) {
      setQuestionComplete({ theme: values.theme, statement: values.statement, alternatives: [{description: values.description, isCorrect: false}]});
    } else {
      setQuestionComplete({ theme: values.theme, statement: values.statement, alternatives: [...alternatives, {description: values.description, isCorrect: false}]});
    }
    // Clear input alternative on add
    document.querySelectorAll('.input-text')[2].value = '';
  }

  // Set question correct in questionComplete
  const handleCorrectAnswer = () => {
    const radios = document.querySelectorAll('[type=radio]');
    const { alternatives }= questionComplete;

    const filter = alternatives.find((_element, index) => radios[index].checked).description;

    const newAlternatives = alternatives.map((alternative) => {
      alternative.description === filter ? alternative.isCorrect = true : alternative.isCorrect = false;
      return alternative;
    });
    setQuestionComplete((prevState) => ({
      ...prevState,
      alternatives: newAlternatives,
    }));
  }

  const handleDeleteAlternative = (description) => {
    const { alternatives } = questionComplete;
    const alternativesFiltered = alternatives.filter((alternative) => alternative.description !== description);
    setQuestionComplete((prevState) => ({
      ...prevState,
      alternatives: alternativesFiltered,
    }));
  }

  return (
    <ContainerMain>
      <Link to="/"><Button backgroundColor='#EAAF58' color="#363636" marginRight={4} type="button"><ImHome3 /></Button></Link>
      <ContainerSecondary>
        <ContainerForm>
          <Input autoComplete="off" type="text" placeholder="Theme" name="theme" className="input-text" size='lg' onChange={ handleChangeValues }/>
          <Textarea autoComplete="off" type="text" placeholder="Statement" name="statement" className="input-text" size='lg' onChange={ handleChangeValues }/>
          <Textarea autoComplete="off" type="text" placeholder="Alternative" name="description" className="input-text" size='lg' onChange={ handleChangeValues }/>
          <ContainerActionButtons>
            <Button colorScheme='cyan' type="button" className="btn-add" marginRight={4} disabled={ addButtonDisable } onClick={ handleAddAlternatives }>Add Alternative</Button>
            <Button colorScheme='green' type="button" disabled={ registerButtonDisable } onClick={ registerQuestion }>Register</Button>
          </ContainerActionButtons>
        </ContainerForm>
        <ContainerAlternatives className="container-correct-asnwer">
          <Text fontSize='xl' as="b" className="text-select-correct-answer" color="#8E5C0F">Select correct alternative</Text>
            { questionComplete?.alternatives?.length ? (
              questionComplete.alternatives.map((question, index) => (
                <div key={index}>
                  <label className="label-radio">
                    <input className="form-check-input" type="radio" name="alternatives" value={question.description} onChange={ handleCorrectAnswer }/>
                    { question.description }
                    <button onClick={ () => handleDeleteAlternative(question.description) }><AiFillCloseSquare className="button-delete-alternative"/></button>
                  </label>
                </div>
              ))
          ): <Text fontSize='md'>No alternative registered</Text>}
        </ContainerAlternatives>
      </ContainerSecondary>
    </ContainerMain>
  );
}
