const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  NotFoundError,
  AuthenticationError,
  BadRequestError,
  ConflictError,
} = require('../error/error');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};
const getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Такого пользователя не существует'))
    .then((user) => {
      res.send({ data: user });
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
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Этот email уже зарегестрирован'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при создание пользователя'));
      } else {
        next(err);
      }
    });
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при обновлении имени'));
      } else {
        next(err);
      }
    });
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при обновлении аватара'));
      } else {
        next(err);
      }
    });
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
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            Promise.reject(
              new AuthenticationError('Неправильные почта или пароль'),
            )
              .catch(next);
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
              sameSite: 'none',
              secure: true,
            });
            res.status(200).send({ message: 'Авторизация успешна!' });
          }
        })
        .catch(next);
    })
    .catch(next);
};
const signOut = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.send({ message: 'Деавторизация' });
  return res.end();
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUserProfile,
  signOut,
};
