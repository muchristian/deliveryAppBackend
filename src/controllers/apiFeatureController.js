import ApiFeatureService from '../services/ApiFeatureService';
import Validation from '../utils/Validation';

const { apiFeatureRegValidation } = Validation;
export default class apiFeatureController {


 static async apiFeatureRegister(req, res) {
    const { error } = apiFeatureRegValidation(req.body);
    if (error) {
      res.status(400).send(error.details);
    }
    try {
        await ApiFeatureService.saveAll({...req.body});
        return res.status(200).json({
            message: "Successfully created an api feature",
        })
    } catch(e) {
        return res.status(400).json({
            message: "Something went wrong while creating an api feature"
        })
    }

 }

 static async getFeatures() {
     const result = await ApiFeatureService.getAll({
        attributes: ['uuid', 'feature']
     });
     return res.status(200).json({
        message: "Successfully returned all features",
        data: result
    })
 }
}