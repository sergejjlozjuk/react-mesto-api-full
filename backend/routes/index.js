const Router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { authRouter } = require('./auth');
const { cardsRouter } = require('./cards');
const { notFoundPage } = require('./error');
const { usersRouter } = require('./users');

Router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
Router.use('/', authRouter);
Router.use(auth);
Router.use('/users', usersRouter);
Router.use('/cards', cardsRouter);
Router.use('*', notFoundPage);
module.exports = {
  Router,
};
