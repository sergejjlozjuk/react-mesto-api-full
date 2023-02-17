require('dotenv').config();
const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { default: helmet } = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.set('strictQuery', false);
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
const { errorHandler } = require('./error/error');
const { Router } = require('./routes');
const { checkSource } = require('./middlewares/cors');

const {
  PORT = 3000,
  DB_CONNECT = 'mongodb://localhost:27017/',
  DB_NAME = 'mestodb',
} = process.env;
mongoose.connect(DB_CONNECT + DB_NAME);
app.use(helmet());
app.use(checkSource);
app.use(limiter);
app.use(requestLogger);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', Router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT);
