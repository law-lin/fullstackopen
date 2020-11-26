const config = require('./utils/config');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const peopleRouter = require('./controllers/people');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

// Load middleware
app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.use('/api/people', peopleRouter);

app.use(middleware.errorHandler);

module.exports = app;
