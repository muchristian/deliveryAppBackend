import _ from 'lodash';
import Validation from '../utils/Validation';
import DeliverReqServices from '../services/DeliverReqService';
import ProdToDeliverServices from '../services/ProdToDeliverService';
import ProdReceiverServices from '../services/ProdReceiverService';
import redisClient from '../redis.config';

const { ProductRequestValidation } = Validation;
export default class productRequestController {
    static async requestToDeliver(req, res) {
        const io = req.app.get('socketio');
        const { error } = ProductRequestValidation(req.body);
        if (error) {
            res.status(400).send(error.details); 
        }
        try {
        
        const deliverReq = await DeliverReqServices.saveAll({sender: req.sessionUser.id})
        if (deliverReq) {
            const {dataValues} = deliverReq
            const data = {
                deliverReqId: dataValues.id,
                ..._.omit(req.body, ['name', 'phoneNumber', 'address'])
            }
            redisClient.lpush('deliver_request_list', JSON.stringify(data));
            await ProdReceiverServices.saveAll(
                {..._.omit(req.body, ['prod_name', 'quantity', 'weight', 'productImage']), deliverReqId: dataValues.id});
            await ProdToDeliverServices.saveAll(
                {..._.omit(req.body, ['name', 'phoneNumber', 'address']), deliverReqId: dataValues.id});
        }
        io.emit("new deliver request", "sent");
        return res.status(200).json({
            message: 'You successfully requested to deliver'
        })
    } catch(e) {
        return res.status(400).json({
            message: e
        })
    }
        
    }   

    static async driverReqApprove(req, res) {
        try {
        const { driver } = req.body;
        const data = {
            driver,
            isApproved: 1,
            mode: 'process'
        }
        const arr = [];
        await DeliverReqServices.updateBy({...data}, { id: req.params.reqId });
        redisClient.lrange('deliver_request_list', 0, -1, (err, requests) => {
            requests.map(item => arr.push(JSON.parse(item)));
            const reqval = arr.find(el => el.deliverReqId == req.params.reqId)
            redisClient.lrem('deliver_request_list', 0, JSON.stringify(reqval));
        });
        return res.status(200).json({
            message: "Request is approved successfully"
        })
    } catch(e) {
        return res.status(400).json({
            message: e
        })
    }
    }  
}