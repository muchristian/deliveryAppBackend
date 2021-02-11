import authRoutes from './auth.routes';
import driverRoutes from './driver.routes';
import shopRoutes from './shop.routes';
import productRequestRoutes from './productRequest.routes';
import express, {Router} from 'express';
const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/driver', driverRoutes);
apiRouter.use('/shop', shopRoutes);
apiRouter.use('/product', productRequestRoutes)



export default apiRouter;
