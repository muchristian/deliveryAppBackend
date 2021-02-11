import Joi from "joi";

class Validation {
  SignupValidation = (user) => {
    const schema = Joi.object({
      firstName: Joi.string().regex(new RegExp("^([a-zA-Z]{3,})+$")),
      lastName: Joi.string().regex(new RegExp("^([a-zA-Z]{3,})+$")),
      username: Joi.string().regex(new RegExp("^([a-zA-Z]{3,})+$")).required(),
      phoneNumber: Joi.string().regex(new RegExp("^\\d{9}$")),
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,16}$/)
        .required(),
      address: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{0,}+$")),
    });
    return schema.validate(user, {
      abortEarly: false,
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
      abortEarly: false,
      allowUnknown: true,
    });
  }

  LoginValidation = (data) => {
    const schema = Joi.object({
      email: Joi.required(),
      password: Joi.required()
    });
    return schema.validate(data, {
      abortEarly: false,
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
      abortEarly: false,
      allowUnknown: true,
    });
  }

  ShopRegValidation = (shop) => {
    const schema = Joi.object({
      name: Joi.string().regex(new RegExp("^([a-zA-Z])+$")).required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().regex(new RegExp("^\\d{9}$")),
      host: Joi.string()
        .regex(/^(?=.*[a-z])[A-Za-z\d@$!%*?&/]$/)
        .required()
    });
    return schema.validate(shop, {
      abortEarly: false,
      allowUnknown: true,
    });
  }

  apiFeatureRegValidation = (key) => {
    const schema = Joi.object({
      feature: Joi.string().regex(new RegExp("^([a-zA-Z])+$")).required(),
      maxUsage: Joi.string().regex(new RegExp("^([=0-9])+$")).required()
    });
    return schema.validate(key, {
      abortEarly: false,
      allowUnknown: true,
    });
  }
}

export default new Validation();
