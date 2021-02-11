import express from 'express';
import shopController from '../../controllers/shopController';
import authMiddleware from '../../middlewares/authMiddleware';
import { uploadLogo } from "../../middlewares/fileUploadMiddleware";

const { shopRegister } = shopController;
const { isUserAuthInAndVerified, isRole } = authMiddleware;

const shopRoute = express.Router();

shopRoute.post('/register', isUserAuthInAndVerified, isRole('ADMIN'), uploadLogo, shopRegister);

export default shopRoute;