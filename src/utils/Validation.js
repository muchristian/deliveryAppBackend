import Joi from "joi";

class Validation {
  SignupValidation = (user) => {
    const schema = Joi.object({
      firstName: Joi.string().regex(new RegExp("^([a-zA-Z]{3,})+$")).required(),
      lastName: Joi.string().regex(new RegExp("^([a-zA-Z]{3,})+$")).required(),
      phoneNumber: Joi.string().regex(new RegExp("^\\d{9}$")),
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,16}$/)
        .required(),
      confirmpassword: Joi.string().required().valid(Joi.ref("password"))
    });
    return schema.validate(user, {
      abortEarly: true,
      allowUnknown: true,
    });
  }

  ProductRequestValidation = (data) => {
    const schema = Joi.object({
      prod_name: Joi.string().regex(new RegExp("^([a-zA-Z0-9]{3,})+$")).required(),
      quantity: Joi.number().integer().required(),
      weight: Joi.number().integer().required(),
      image: Joi.string(),
      name: Joi.string(),
      phoneNumber: Joi.string(),
      address: Joi.string()
    });
    return schema.validate(data, {
      abortEarly: true,
      allowUnknown: true,
    });
  }

  LoginValidation = (data) => {
    const schema = Joi.object({
      email: Joi.required(),
      password: Joi.required()
    });
    return schema.validate(data, {
      abortEarly: true,
      allowUnknown: true,
    });
  }

  DriverRegValidation = (user) => {
    const schema = Joi.object({
      firstName: Joi.string().regex(new RegExp("^([a-zA-Z]{3,})+$")).required(),
      lastName: Joi.string().regex(new RegExp("^([a-zA-Z]{3,})+$")).required(),
      phoneNumber: Joi.string().regex(new RegExp("^\\d{9}$")),
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,16}$/)
        .required()
    });
    return schema.validate(user, {
      abortEarly: true,
      allowUnknown: true,
    });
  }
}

export default new Validation();
