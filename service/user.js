const bcrypt = require('bcrypt');
const ApiError = require('../error/apiError');
const { User } = require('../models/models');
const generateJwt = require('../utils/createToken');

class UserService {
  async googleAuth(email, password, role = 'USER') {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return generateJwt(candidate.id, candidate.email, candidate.role);
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    return generateJwt(user.id, user.email, user.role);
  }

  async registartion(email, password, role) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.badRequest('A user with such an email already exists');
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    return generateJwt(user.id, user.email, user.role);
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.notFound('The user with such an email was not found');
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw ApiError.badRequest('Invalid password');
    }
    return generateJwt(user.id, user.email, user.role);
  }

  async check(user) {
    return generateJwt(user.id, user.email, user.role);
  }

  async delete(id) {
    await User.destroy({ where: { id } });
  }
}

module.exports = new UserService();
