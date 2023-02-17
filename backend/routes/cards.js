const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regex } = require('../constants/constants');
const {
  getCards,
  deleteCard,
  createCard,
  setLike,
  deleteLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.delete(
  '/:cardId',
  celebrate({
    params: {
      cardId: Joi.string()
        .required()
        .hex()
        .length(24),
    },
  }),
  deleteCard,
);
cardsRouter.post(
  '/',
  celebrate({
    body: {
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .regex(regex.link),
    },
  }),
  createCard,
);
cardsRouter.put(
  '/:cardId/likes',
  celebrate({
    params: {
      cardId: Joi.string()
        .required()
        .hex()
        .length(24),
    },
  }),
  setLike,
);
cardsRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: {
      cardId: Joi.string()
        .required()
        .hex()
        .length(24),
    },
  }),
  deleteLike,
);

module.exports = { cardsRouter };
