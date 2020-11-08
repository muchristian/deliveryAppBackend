import DriverServices from '../services/DriverService';
import Validation from '../utils/Validation';
import jwtUtils from '../utils/authUtil';

const { DriverRegValidation } = Validation;
const { hashPassword } = jwtUtils;

export default class driverController {

    static async registerDriver(req, res) {
    const { error } = DriverRegValidation(req.body);
    if (error) {
      res.status(400).send(error.details);
    }
    try {
      const { email } = req.body;
    const findDriver = await DriverServices.getOneBy({ email: email.toLowerCase() });
      if (findDriver) {
        return res.status(400).json({
          message: "User with that email already exist",
        });
      }
      const hashedPassword = await hashPassword(req.body.password);
      const data = {
        ...req.body,
        password: hashedPassword
      }
      console.log(data);
      await DriverServices.saveAll({...req.body, password: hashedPassword});
      return res.status(200).json({
        message: "Well done! Driver is successfully registed"
      })
    } catch(e) {
      console.log(e)
        return res.status(400).json({
            message: "Something went wrong with Driver registration"
        })
    }
    }

    static async updateDriver(req, res) {
      console.log(req.params)
      try {
        const findDriver = await DriverServices.getOneBy({phoneNumber: req.params});
        const data = await DriverServices.updateBy({...req.body}, {phoneNumber: req.params});
        return res.status(200).json({
          message: "Driver credentials updated successfully",
          data
      })
      } catch(e) {
        return res.status(400).json({
          message: "Check if a driver with that phone nber exist"
      })
      }
    }

}
