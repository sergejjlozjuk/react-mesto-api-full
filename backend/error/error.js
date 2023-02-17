const { AuthenticationError } = require('./authenticationerror');
const { ValidationError } = require('./validationerror');
const { NotFoundError } = require('./notfounderror');
const { ForbiddenError } = require('./forbidenerror');
const { BadRequestError } = require('./badrequesterror');

const errorHandler = (err, req, res, next) => {
  if (
    err instanceof NotFoundError
    || err instanceof ValidationError
    || err instanceof AuthenticationError
    || err instanceof ForbiddenError
    || err instanceof BadRequestError
  ) {
    res.status(err.statusCode).send({ message: err.message });
  } else if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(400).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
  next();
};

module.exports = {
  NotFoundError,
  ValidationError,
  AuthenticationError,
  ForbiddenError,
  BadRequestError,
  errorHandler,
};
