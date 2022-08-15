const jwt = require('jsonwebtoken');

module.exports = function (token) {
  const [, tokenRaw] = token.split(' ');
  return jwt.verify(tokenRaw, process.env.SECRET_KEY);
};
