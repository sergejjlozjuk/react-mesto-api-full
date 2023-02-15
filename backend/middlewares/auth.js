const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('../error/error');

const { JWT_SECRET } = process.env;
const auth = (req, res, next) => {
  console.log(req.headers, req.cookies)
  // const token = req.headers.authorization.replace('Bearer ', '');
  // if (!token) {
  //   return next(new AuthenticationError('Требуется авторизация'));
  // }
  // let payload;
  // try {
  //   payload = jwt.verify(token, JWT_SECRET);
  // } catch (err) {
  //   return next(new AuthenticationError('Требуется авторизация'));
  // }
  // req.user = payload;
  return next();
};
module.exports = {
  auth,
};
