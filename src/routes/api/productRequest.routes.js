import express from 'express';
import productRequestController from '../../controllers/productRequestController';
import authMiddleware from '../../middlewares/authMiddleware';

const { requestToDeliver, driverReqApprove } = productRequestController;
const { isUserAuthInAndVerified, isCustomer } = authMiddleware;
const prodReqRouter = express.Router();

prodReqRouter.post('/product-request', isUserAuthInAndVerified, requestToDeliver);
prodReqRouter.put('/approve-request/:reqId', isUserAuthInAndVerified, driverReqApprove);

export default prodReqRouter;

