import { Op } from 'sequelize';
import ShopService from '../services/ShopService';
import models from '../database/models';
import moment from 'moment';
//const {api_key} = models;
class apikeyMiddleware {

    monthlyApi = async (req, res, next) => {
        //Where is the API key expected to be?
        let host = req.headers.origin;
        console.log(host)
        //let api_key = req.query.api_key; //version 1 with the querystring
        //let api_key = req.params.apikey; //version 2 with the URL params
        let xapi_key = req.header('x-api-key'); //version 3 using a header
        console.log(xapi_key)
        try {
            let account = await ShopService.getOneBy({
                [Op.and]: [
                    { host: host },
                    { apiKey: xapi_key }
                  ]
            })
            console.log("-------------------")
            const {dataValues} = account;

            console.log(dataValues);
            // const data = JSON.parse(dataValues.apiUsage)
            
            
            if (dataValues) {
                //good match
                //check the usage
                console.log(new Date().toLocaleString().replace(',',''))
                const d = moment(new Date(dataValues.api_createdAt)).add(30, 'd').format('YYYY/MM/DD HH:mm:mm');
                // d.setDate(d.getDate() + 30);
                const currd = moment(new Date()).format('YYYY/MM/DD HH:mm:mm');
                console.log(d)
                    console.log(currd)
                if (currd >= d) {
                    
                    res.status(429).send({
                        error: {
                          code: 429,
                          message: 'time is up.',
                        },
                      });
                  //already used today
                } else {
                  if (dataValues.countApiUsage >= 500) {
                      console.log('fdafda')
                    //stop and respond
                    res.status(429).send({
                        error: {
                          code: 429,
                          message: 'Max API calls exceeded.',
                        },
                      });
                    } else {
                        console.log('fdafda2')
                      //have not hit todays max usage
                      await ShopService.updateBy({countApiUsage: dataValues.countApiUsage+1}, { host: host });
                    console.log("next")
                      next();
                    }
                }
              } else {
                //stop and respond
                res.status(403).send({ error: { code: 403, message: 'You are not registed for this service.' } });
              }
            
        } catch(e) {
            console.log(e)
            res.status(403).send({ error: e})
        }
    }

}

export default new apikeyMiddleware();
