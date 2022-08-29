const express = require('express');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;