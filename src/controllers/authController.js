import UserServices from "../services/UserService";
import DriverServices from "../services/DriverService";
import authUtils from "../utils/authUtil";
import Validation from "../utils/Validation";
import _ from 'lodash';
import redisClient from '../redis.config';

const { hashPassword, isPasswordTrue, generateToken } = authUtils;
const { SignupValidation, LoginValidation } = Validation;
export default class authController {
  static async signup(req, res) {
    const { error } = SignupValidation(req.body);
    if (error) {
      res.status(400).send(error.details);
    }

    try {
      const { email, password } = req.body;
      const findUser = await UserServices.getOneBy({ email: email.toLowerCase() });
      if (findUser) {
        return res.status(400).json({
          message: "User with that email already exist",
        });
      }
      const hashedPassword = await hashPassword(password);
      const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email.toLowerCase(),
        password: hashedPassword
      };
      const savedUser = await UserServices.saveAll(userData);
      const { dataValues } = savedUser;
      return res.status(200).json({
        message: "You successfully created your account",
        token: generateToken(dataValues)
      });
    } catch (error) {
      return res.status(400).json({
        message: "Something went wrong while registering"
      });
    }
  };

  static login = async (req, res) => {
    const { error } = LoginValidation(req.body);
    if (error) {
      res.status(400).send(error.details);
    }
    try {
      const { email, password } = req.body;
      
      let findUser = await UserServices.getOneBy({ email: email });
      if (!findUser) {
        findUser = await DriverServices.getOneBy({ email: email })
      }
      const { dataValues } = findUser;
      if (!await isPasswordTrue(password, dataValues.password)) {
        return res.status(400).json({
          message: "The password provided doesnt match with the email"
        });
      }
        return res.status(200).json({
          message: "Great! You successfully logged in",
          token: generateToken(dataValues)
        });
    } catch (err) {
      return res.status(401).json({
        message: "The provided credentials not found",
      });
    }
  };

  static async sendResetEmail(req, res) {
    const { email } = req.body;
    const {
      intro, instruction, text
    } = resetMessage;
      const users = await UserService.getOneBy({ email: email.toLowerCase() });
      if (users) {
        const user = users.dataValues;
        const token = generateToken(user);
        const url = `${token}`;
        await sendMail(user.email, user.firstName, intro, instruction, text, url);
        return successResponse(res, statusCodes.ok, customMessages.resetEmail, token);
      }
      return errorResponse(res, statusCodes.forbidden, customMessages.notExistUser);
  }

  static async updatePassword(req, res) {
    const { token } = req.params;
    const { password } = req.body;
    const {
      intro, instruction, text
    } = changedMessage;

    const userDetails = await decodeToken(token);
    const users = await UserService.getOneBy({ email: userDetails.email });
    const user = users.dataValues;
    const hashedPassword = await hashPassword(password);
    await UserService.updateBy({ password: hashedPassword }, { id: user.id });
    await sendMail(user.email, user.firstName, intro, instruction, text, '#');
    return updatedResponse(res, statusCodes.ok, customMessages.changed);
  }

  static async verify(req, res) {
    const { token } = req.query;
    const decoded = jwtDecode(token);
    const { email } = decoded;
    await UserService.updateBy({ isVerified: true }, { email });
    return successResponse(res, statusCodes.ok, customMessages.verifyMessage);
  }

  static logout(req, res) {
    const token = req.headers.authorization || req.params.token;
    console.log(token)
    redisClient.sadd('token', token);
    return res.status(200).json({
      message: "You successfully logged out"
    });
  };
  
}
