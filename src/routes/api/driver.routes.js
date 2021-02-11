import express from 'express';
import driverController from '../../controllers/driverController';
import authMiddleware from '../../middlewares/authMiddleware';
import { driverUploadFile } from "../../middlewares/fileUploadMiddleware";

const { registerDriver } = driverController;
const { isUserAuthInAndVerified, isRole } = authMiddleware;

const driverRoute = express.Router();

driverRoute.post('/register', isUserAuthInAndVerified, isRole('ADMIN'), driverUploadFile, registerDriver);

export default driverRoute;