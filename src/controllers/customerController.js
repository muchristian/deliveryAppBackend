import UserService from '../services/UserService';
import Validation from "../utils/Validation";
import path from 'path';

const {SignupValidation} = Validation;
export default class customerController {
    static async update(req, res) {
        const { error } = SignupValidation(req.body);
        if (error) {
          res.status(400).send(error.details);
        }
        const rm = path.join(__dirname, '..', '..', 'public')
        const newpath = req.file.path.replace(rm, '')
        try {
            const {id} = req.params;
            const { email } = req.body;
            const checkEmail = await UserServices.getOneBy({ email: email.toLowerCase() });
      // const checkUsername = await UserService.getOneBy({ username });
    if (checkEmail) {
      return res.status(400).json({
        message: "User with that email already exist",
      });
    }       

            const result = await UserService.updateBy({
              ...req.body,
              avatar_mimetype: req.file.mimetype,
              avatar_fileName: req.file.originalname,
              avatar: newpath
            }, {uuid: id});
            return res.status(200).json({
                message: "You successfully updated your account",
                data: result
              });
        } catch(err) {
            return res.status(400).json({
                message: "Something went wrong!",
                error: err
              });
        }
    }


    static async destroyAccount(req, res) {
      const { id } = req.params;
      await UserService.temporaryDelete({uuid: id});
      return res.status(200).json({
        message: "Account deleted successfully"
      })
    }
}