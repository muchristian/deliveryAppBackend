import DriverService from "../services/DriverService";
import VehicleService from "../services/VehicleService";
import DocumentService from "../services/DocumentService";
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import authUtils from "../utils/authUtil";

const newFilePath = (filePath) => {
  const rm = path.join(__dirname, '..', '..', 'public')
  const newpath = filePath.replace(rm, '')
  return newpath
}
export default class driverController {
  static async registerDriver(req, res) {
    // console.log("=====")
    // console.log(req.userData)
    // console.log(req.body)
    // console.log(req.files.driverAvatar[0])
    // const rm = path.join(__dirname, '..', '..', 'public')
    // console.log(rm)
    // const newpath = req.files.driverAvatar[0].path.replace(rm, '')
    // res.send(newpath)
    const { error } = DriverRegValidation(req.body);
    if (error) {
      res.status(400).send(error.details);
    }
    try {
      const { email, password } = req.body;
      const { id:user_id } = req.userData;
      const { driverAvatar, documents } = req.files;
      const findDriver = await DriverService.getOneBy({ email: email.toLowerCase() });
      if (findDriver) {
        return res.status(400).json({
          message: "Driver with that email already exist",
        });
      }

      // let fileObj = {}
      // if (req.file) {
      //   fileObj = {
      //     ...req.body,

      //   }
      //   fileObj.logo_mimetype = req.file.mimetype;
      //   fileObj.logo_fileName = req.file.originalname,
      //   fileObj.logo = 
      // }
      const hashedPassword = await hashPassword(password);
      const driverRes = await DriverService.saveAll(
        {
          ..._.pick(req.body, ['firstName', 'lastName', 'email', 'phoneNumber', 'idNumber']),
          avatar_mimetype: driverAvatar[0].mimetype,
          avatar_fileName: driverAvatar[0].originalName,
          avatar: newFilePath(driverAvatar[0].path),
          password: hashedPassword,
          createdBy: user_id,
          api_createdAt: moment(new Date()).format()     
        });

      const { dataValues:driverData } = driverRes;
      
      const vehicleRes =  await VehicleService.saveAll({
        ..._.pick(req.body, ['vehicleType', 'plateNber', 'yellowCard']),
        driverId: driverData.uuid
      });

      const { dataValues:vehicleData } = vehicleRes;
      
      if (documents.length > 0) {
        for (const document of documents) {
        await DocumentService.saveAll({
          vehicleId: vehicleData.uuid,
          document_mimetype: document.mimetype,
          document_fileName: document.originalName,
          document: newFilePath(document[0].path)
        })
        }
      }
      await sendMail(customer.customerEmail, 
        customer.customerFname, trackNber);
      return res.status(200).json({
        message: "Well done! Driver is successfully registed"
      })
    } catch(e) {
      console.log(e)
        return res.status(400).json({
            message: "Something went wrong with Driver registration",
            error: e
        })
    }
  } 

} 

