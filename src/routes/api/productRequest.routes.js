import express from 'express';
import productRequestController from '../../controllers/productRequestController';
import authMiddleware from '../../middlewares/authMiddleware';
import apikeyMiddleware from '../../middlewares/apiKeyMiddleware';

const { requestToDeliver, driverReqApprove, makeRequest, findTrack } = productRequestController;
const { isUserAuthInAndVerified, isRole } = authMiddleware;
const { monthlyApi } = apikeyMiddleware;
const prodReqRouter = express.Router();

prodReqRouter.post('/make-request', monthlyApi, makeRequest);
prodReqRouter.get('/view-track', findTrack);
prodReqRouter.post('/product-request', isUserAuthInAndVerified, requestToDeliver);
prodReqRouter.put('/approve-request/:reqId', isUserAuthInAndVerified, driverReqApprove);

export default prodReqRouter;

