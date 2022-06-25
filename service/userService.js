const ApiError = require("../error/apiError");
const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserService {
  async googleAuth(email, password, role='USER') {
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
      throw new ApiError(400, "The user exists")
     // return ApiError.badRequest("The user exists");
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    return generateJwt(user.id, user.email, user.role);
  }
  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return ApiError.notFound("The user with such an email was not found");
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return ApiError.badRequest("Invalid password");
    }
    return generateJwt(user.id, user.email, user.role);
  }
  async check(user) {
    return generateJwt(user.id, user.email, user.role);
  }
}

module.exports = new UserService();
