import authRoutes from './auth.routes';
import productRequestRoutes from './productRequest.routes';
import driverRoutes from './driver.routes';
import express, {Router} from 'express';
const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/product', productRequestRoutes)
apiRouter.use('/driver', driverRoutes);

export default apiRouter;
