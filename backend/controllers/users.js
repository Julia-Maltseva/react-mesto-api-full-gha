const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const ErrorCode = require('../error');
const Conflict = require('../errors/ConflictError');
const BadRequest = require('../errors/BadRequestError');
const NotFound = require('../errors/NotFoundError');
const Unauthorized = require('../errors/UnauthorizedError');

const createUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  const hash = await bcrypt.hash(password, 10);
  return User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  })
    .then((user) => res.status(ErrorCode.STATUS_OK).send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch((error) => {
      if (error.code === 11000) {
        next(new Conflict('Пользователь с такими данными уже существует'));
        return;
      }
      if (error.name === 'ValidationError') {
        next(new BadRequest(`Переданы некорректные данные пользователя ${error}`));
        return;
      }
      next(error);
    });
};

const getUserId = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (user) {
        res.status(ErrorCode.STATUS_OK).send(user);
      } else {
        next(new NotFound('Запрашиваемый пользователь не найден'));
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные пользователя'));
        return;
      }
      next(error);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(ErrorCode.STATUS_OK).send(users))
    .catch((error) => {
      next(error);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.status(ErrorCode.STATUS_OK).send({ name: user.name, about: user.about });
      } else {
        next(new NotFound('Запрашиваемый пользователь не найден'));
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest(`Переданы некорректные данные пользователя ${error}`));
        return;
      }
      next(error);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.status(ErrorCode.STATUS_OK).send({ avatar: user.avatar });
      } else {
        next(new NotFound('Запрашиваемый пользователь не найден'));
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest(`Переданы некорректные данные пользователя ${error}`));
        return;
      }
      next(error);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User
    .findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new Unauthorized('Неправильный email или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new Unauthorized('Неправильный email или пароль'));
          }
          const token = jwt.sign({ id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
          return res.send({ token });
        });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest(`Переданы некорректные данные пользователя ${error}`));
        return;
      }
      next(error);
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(ErrorCode.STATUS_OK).send(user);
      } else {
        next(new NotFound('Запрашиваемый пользователь не найден'));
      }
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUserId,
  getUsers,
  updateProfile,
  updateAvatar,
  login,
  getUser,
};
