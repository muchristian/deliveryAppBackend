import express from 'express';
import driverController from '../../controllers/driverController';
import authMiddleware from '../../middlewares/authMiddleware';

const { registerDriver } = driverController;
const { isUserAuthInAndVerified, isAdmin } = authMiddleware;

const driverRoute = express.Router();

driverRoute.post('/register', isUserAuthInAndVerified, isAdmin, registerDriver);

export default driverRoute;