const Joi = require("joi");

const userDTO = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string(),
  role: Joi.string(),
});

module.exports = {
  userDTO,
};
