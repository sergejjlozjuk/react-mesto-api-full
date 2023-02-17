const authRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login, signOut } = require('../controllers/users');
const { regex } = require('../constants/constants');

authRouter.post(
  '/sign-up',
  celebrate({
    body: {
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(regex.link),
    },
  }),
  createUser,
);
authRouter.post(
  '/sign-in',
  celebrate({
    body: {
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  login,
);
authRouter.delete(
  '/',
  signOut,
);

module.exports = {
  authRouter,
};
