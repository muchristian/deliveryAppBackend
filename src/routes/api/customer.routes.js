import express from 'express';
import customerController from '../../controllers/customerController';
import authMiddleware from '../../middlewares/authMiddleware';
import { customerUploadAvatar } from "../../middlewares/fileUploadMiddleware";

const { update } = customerController;
const { isUserAuthInAndVerified, isRole } = authMiddleware;

const customerRoute = express.Router();

customerRoute.post('/update/:id', isUserAuthInAndVerified, isRole('CUSTOMER'), customerUploadAvatar, update);

export default driverRoute;
