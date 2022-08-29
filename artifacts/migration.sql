DROP DATABASE IF EXISTS QuestionsDatabase;

CREATE DATABASE QuestionsDatabase;

USE QuestionsDatabase;

CREATE TABLE questions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    theme VARCHAR(100) NOT NULL,
    statement TEXT NOT NULL
);

CREATE TABLE alternatives (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    id_statement INT NOT NULL,
    description TEXT NOT NULL,
    isCorrect BOOL NOT NULL,
    FOREIGN KEY (id_statement) REFERENCES QuestionsDatabase.questions(id)
);