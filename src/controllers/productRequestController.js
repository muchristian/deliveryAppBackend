import _ from 'lodash';
import Validation from '../utils/Validation';
import SellerService from '../services/SellerService';
import ProductService from '../services/ProductService';
import RequestService from '../services/RequestService';
import RequestDetailService from '../services/RequestDetailService';
import TrackService from '../services/TrackService';
import redisClient from '../redis.config';
import { Op } from 'sequelize';
import models from '../database/models';
import sendMail from '../utils/mailUtil';
const { request, request_detail, track, product} = models;

const { ProductRequestValidation } = Validation;
export default class productRequestController {
    static async makeRequest(req, res) {
          const trackNumber = [
          Date.now(),
          Math.floor(100 + Math.random() * 900)
          ]
          console.log(req.body);
        try {
            const {seller, product, customer, orderDetails} = req.body;
            const seller1 = await SellerService.saveAll({...seller});
            const {dataValues:sellerData} = seller1;
            const product1 = await ProductService.saveAll({...product, sellerId: sellerData.id});
            const {dataValues:productData} = product1;
            const request = await RequestService.saveAll({...customer});
            const {dataValues:requestData} = request;
            await RequestDetailService.saveAll(
                {...orderDetails, requestId: requestData.id, productId: productData.id});
            const track = await TrackService.saveAll(
                {trackNber: trackNumber.join(''), requestId: requestData.id});
                const {trackNber} = track;
                await sendMail(customer.customerEmail, 
                    customer.customerFname, trackNber);
                
                    return res.status(200).json({
                        message: 'An order has beeen approved successfully'
                    })
        } catch (e) {
            return res.status(400).json({
                message: "something went wrong, check out!"
            })
        }
    }
    static async findTrack(req, res) {
        const {trackNber, reqOwner} = req.query;
        console.log(req.query);
        try {
            const response = await RequestService.getOneByInclude({
                [Op.and]: [
                {'$track.trackNber$': `${trackNber}`},
                {'customerEmail': `${reqOwner}`}
                ]

            }, [
                { model: track, as: 'track' },
                { model: request_detail,
                    include: [
                        {model: product }
                    ]
                 }
            ]);
            const {dataValues} = response;
            console.log(dataValues);
            return res.status(200).json({
                message: 'track details returned successfully'
            })
        } catch(e) {
            console.log(e)
            return res.status(400).json({
                message: e
            })
        }
    }
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