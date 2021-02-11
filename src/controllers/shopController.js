import Validation from '../utils/Validation';
import ShopService from '../services/ShopService';
import genKey from '../utils/apiKeyGen';
import moment from 'moment';
import {getPagination, getPagingData} from '../utils/paginate';
import path from 'path';

const { ShopRegValidation } = Validation;

export default class shopController {

    static async shopRegister(req, res) {
        const { error } = ShopRegValidation(req.body);
    if (error) {
      res.status(400).send(error.details);
    }
    try {
      const { name } = req.body;
      const { id:user_id } = req.userData;
    const findShop = await ShopService.getOneBy({ name: name.toLowerCase() });
      if (findShop) {
        return res.status(400).json({
          message: "Shop with that name already exist",
        });
      }
    const rm = path.join(__dirname, '..', '..', 'public')
    const newpath = req.file.path.replace(rm, '')
      // let fileObj = {}
      // if (req.file) {
      //   fileObj = {
      //     ...req.body,

      //   }
      //   fileObj.logo_mimetype = req.file.mimetype;
      //   fileObj.logo_fileName = req.file.originalname,
      //   fileObj.logo = 
      // }
      const result = await ShopService.saveAll(
        {
          ...req.body,
          logo_mimetype: req.file.mimetype,
          logo_fileName: req.file.originalName,
          logo: newpath,
          apiKey: genKey(),
          createdBy: user_id,
          api_createdAt: moment(new Date()).format()     
        });
        const { dataValues } = result;
        await sendMail(customer.customerEmail, 
          customer.customerFname, trackNber);
      return res.status(200).json({
        message: "Well done! Shop is successfully registed",
        data: dataValues
      })
    } catch(e) {
      console.log(e)
        return res.status(400).json({
            message: "Something went wrong with Shop registration",
            error: e
        })
    }
    }

    static async genApiKey(req, res) {
      const {id} = req.params;
      const {dataValues} = await ShopService.updateBy({
        apiKey: genKey()
      }, {uuid: id});
      return res.status(200).json({
        message: "Well done! Shop apikey updated successfully",
        data: dataValues
      })
    }

    static async getAllShops(req, res) {
      const { page, size } = req.query;
    
      const { limit, offset } = getPagination(page, size);
      const result = await ShopService.getAndCountAllIncludeAssociation({}, offset, limit);
      return res.status(200).json({
        message: "Well done! all shops returned successfully",
        data: getPagingData(result, page, limit)
      })
    }

    static async getOneShop(req, res) {
      const { id } = req.params;
      const result = await ShopService.getOneBy({uuid: id});
      return res.status(200).json({
        message: "Well done! one shop returned successfully",
        data: result
      })
    }

    static async toggleIsActive() {
      const { id } = req.params;
      try {
        const data = await ShopService.updateBy({}, {uuid: id});
        return res.status(200).json({
          message: "Shop info updated successfully",
          data
      })
      } catch(e) {
        return res.status(400).json({
          message: "Check if a shop with that name exist"
      })
      }
    }

    static async updateShop(req, res) {
      const { id } = req.params;
      try {
        const data = await ShopService.updateBy({...req.body}, {uuid: id});
        return res.status(200).json({
          message: "Shop info updated successfully",
          data
      })
      } catch(e) {
        return res.status(400).json({
          message: "Check if a shop with that name exist"
      })
      }
    }

    static async destroyShop(req, res) {
      const { id } = req.params;
      await ShopService.temporaryDelete({uuid: id});
      return res.status(200).json({
        message: "Well done! one shop deleted successfully"
      })
    }

}
