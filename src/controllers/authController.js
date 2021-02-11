import UserServices from "../services/UserService";
import DriverServices from "../services/DriverService";
import authUtils from "../utils/authUtil";
import {resetMessage, changedMessage} from "../utils/emailMessages";
import Validation from "../utils/Validation";
import _ from 'lodash';
import redisClient from '../redis.config';
import sendMail from '../utils/mailUtil';

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
      const checkEmail = await UserServices.getOneBy({ email: email.toLowerCase() });
      // const checkUsername = await UserService.getOneBy({ username });
    if (checkEmail) {
      return res.status(400).json({
        message: "User with that email already exist",
      });
    }
      const hashedPassword = await hashPassword(password);
      const userData = {
        // firstName: req.body.firstName,
        // lastName: req.body.lastName,
        // phoneNumber: req.body.phoneNumber,
        email: email.toLowerCase(),
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
      console.log(email)
      console.log(password)
      let findUser = await UserServices.getOneBy({ email: email.toLowerCase() });
      if (!findUser) {
        findUser = await DriverServices.getOneBy({ email: email.toLowerCase() })
      }
      const { dataValues } = findUser;
      console.log(dataValues)
      if (!await isPasswordTrue(password, dataValues.password)) {
        return res.status(400).json({
          message: "The password provided doesn't match with your email"
        });
      }
        return res.status(200).json({
          message: "Great! You successfully logged in",
          token: generateToken(dataValues)
        });
    } catch (err) {
      console.log(err)
      return res.status(401).json({
        message: "The provided credentials not found",
      });
    }
  };

  static async resetToken() {
    
  }

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
        return res.status(200).json({
          message: "Reset email has been successfully sent",
          token: token
        });
      }
      return res.status(401).json({
        message: "Something went wrong, try again",
      });
  }

  static async updatePassword(req, res) {
    const { token } = req.params;
    const { password } = req.body;
    // const {
    //   intro, instruction, text
    // } = changedMessage;

    const userDetails = await decodeToken(token);
    const users = await UserService.getOneBy({ email: userDetails.email });
    const user = users.dataValues;
    const hashedPassword = await hashPassword(password);
    await UserService.updateBy({ password: hashedPassword }, { id: user.id });
    // await sendMail(user.email, user.firstName, intro, instruction, text, '#');
    return res.status(200).json({
      message: "Well done! You have successfully updated your password"
    });
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
