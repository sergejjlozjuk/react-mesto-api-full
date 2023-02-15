const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { NotFoundError, AuthenticationError } = require('../error/error');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};
const getUserProfile = (req, res, next) => {
  console.log(req.headers)
  User.findById(req.user._id)
    .orFail(new NotFoundError('Такого пользователя не существует'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next);
};
const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Такого пользователя не существует'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const { _id } = user;
      res.status(201).send({
        name,
        about,
        avatar,
        _id,
        email,
      });
    })
    .catch(next);
};
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new NotFoundError('Такого пользователя не существует');
      }
    })
    .catch(next);
};
const updateAvatar = (req, res, next) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new NotFoundError('Такого пользователя не существует');
      }
    })
    .catch(next);
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthenticationError('Неправильные почта или пароль'));
      } return user;
    })
    .then((user) => {
      const matched = bcrypt.compare(password, user.password);
      if (!matched) {
        Promise.reject(
          new AuthenticationError('Неправильные почта или пароль'),
        );
      } else {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev',
          {
            expiresIn: '7d',
          },
        );
        res.cookie('token', token, {
          httpOnly: true,
          domain: 'localhost:3001',
          secure: 'None',
        });
        res.send({ data: 'mddmd' });
        return res.end();
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUserProfile,
};
