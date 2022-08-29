import React, { useEffect, useContext, useState } from 'react'
import { Link } from "react-router-dom";

import QuestionsContext from '../context/QuestionsContext';

import { getAllQuestions, getOneQuestion, deleteQuestion } from '../../services/apiQuestions';

import { MdOutlineClear, MdOutlineCheck } from "react-icons/md";
import { IoIosAlert } from "react-icons/io";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  UnorderedList,
  ListItem,
  ListIcon,
  Container,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Portal
} from '@chakra-ui/react';

import { ContainerMain, ContainerModal, ContainerTable, ContainerTitle, ContainerMessageNoRegisters } from './styles';

export default function List() {
  const {
    questions,
    setQuestions,
  } = useContext(QuestionsContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentQuestionModal, setCurrentQuestionModal] = useState([]);

  const populateListQuestions = async () => {
    setQuestions(await getAllQuestions());
  }
  
  useEffect(() => {
    populateListQuestions();
  }, []);

  const handleDeleteQuestion = async (id, accept) => {
    if (accept){
      await deleteQuestion(id);
      populateListQuestions();
    }
  }
  
  const handleViewQuestion = async(id) => {
    setCurrentQuestionModal(await getOneQuestion(id));
    onOpen();
  }

  return (
    <ContainerMain>
          <ContainerTable>
            <ContainerTitle>
              <Link className='button-register' to="/register"><Button width={200} marginBottom={8} colorScheme='blue' color="white" marginRight={4} type="button">+ Register</Button></Link>
              <Text fontSize='3xl' as='b'>Registered Questions</Text>
            </ContainerTitle>
            { questions.length ? (
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th>Id</th>
                    <th>Theme</th>
                    <th>Statement</th>
                    <th>Actions</th>
                  </tr>
                  { questions.map((question) => (
                    <tr key={question.id}>
                      <td>{question.id}</td>
                      <td>{`${question.theme.substr(0, 25)}...`}</td>
                      <td>{`${question.statement.substr(0, 25)}...`}</td>
          
                      <td>
                        <Button colorScheme='green' type="button" onClick={ () => handleViewQuestion(question.id) }>View</Button>

                        <Popover>
                          <PopoverTrigger>
                            <Button colorScheme='red' type="button" marginLeft={3}>Delete</Button>
                          </PopoverTrigger>
                          <Portal>
                            <PopoverContent>
                              <PopoverArrow />
                              <PopoverHeader>Do you really want to delete this question?</PopoverHeader>
                              <PopoverCloseButton />
                              <PopoverBody>
                                <Button colorScheme='red' marginRight={5} onClick={ () => handleDeleteQuestion(question.id, true) }>Yes</Button>
                              </PopoverBody>
                            </PopoverContent>
                          </Portal>
                        </Popover>

                        <Link to={ `/edit/${question.id}` }><Button colorScheme='yellow' marginLeft={3} type="button">Edit</Button></Link>
                      </td>
                    </tr>
                  )) }
                </tbody>
              </table>
            ) : (
              <ContainerMessageNoRegisters>
                <IoIosAlert className="icon-alert" />
                <Text fontSize='xl' as="b" color="#5C1111">No questions registered</Text>
              </ContainerMessageNoRegisters>
            ) }
        </ContainerTable>
                    
      <ContainerModal>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              { currentQuestionModal?.question?.map((question, index) => (
                <Container key={ index }>
                  <Text fontSize='xl' as='b'>Theme: {question.theme}</Text>
                  <Box color='#2302A9' marginTop={ 3 } marginBottom={ 3 }>
                    <p>{question.statement}</p>
                  </Box>
                </Container>
              )) }

              {currentQuestionModal?.alternatives?.map((alternative, index) => (
                <UnorderedList listStyleType="none" key={ index }>
                  <ListItem display="flex" wordBreak="break-all">
                    <ListIcon as={alternative.isCorrect ? MdOutlineCheck  : MdOutlineClear } color={alternative.isCorrect ? 'green' : 'red'}/>
                    {alternative.description}
                  </ListItem>
                </UnorderedList>
              ))}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ContainerModal>
    </ContainerMain>
  );
}
