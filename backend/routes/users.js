const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserProfile,
} = require('../controllers/users');
const { regex } = require('../constants/constants');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserProfile);
usersRouter.get('/:userId', celebrate({
  params: {
    userId: Joi.string().required().hex().length(24),
  },
}), getUserById);
usersRouter.patch('/me', celebrate({
  body: {
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  },
}), updateProfile);
usersRouter.patch('/me/avatar', celebrate({
  body: {
    avatar: Joi.string().required().regex(regex.link),
  },
}), updateAvatar);

module.exports = { usersRouter };
