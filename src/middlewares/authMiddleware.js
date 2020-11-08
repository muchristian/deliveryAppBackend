import Utils from '../utils/authUtil';
import UserService from '../services/UserService';
import redisClient from '../redis.config';

const { verifyToken } = Utils;

class authMiddleware {
     isUserAuthInAndVerified = async (req, res, next) => {
        let token = req.get('Authorization');
        if (!token) {
          return res.status(400).json({
              message: 'token not found'
          })
        }
        token = token.split(' ').pop();
        console.log(token)
        try {
          const decodedToken = verifyToken(token, process.env.JWT_KEY);
          console.log(decodedToken)
          const user = await UserService.getOneBy({ email: decodedToken.email });
          console.log(user)
          return redisClient.smembers('token', (err, userToken) => {
            if (userToken.includes(token) || !user) {
                return res.status(400).json({
                    message: 'You have already signed out'
                })
            }
            if (user.is_verified < 1) {
                return res.status(401).json({
                    message: 'Please check if you have verified your account first'
                })
            }
            req.sessionUser = decodedToken;
            return next();
          });
        } catch (error) { 
            return res.status(401).json({
                message: 'Invalid token'
            })
        }
      }

      isCustomer = (req, res, next) => {
        if (req.sessionUser.role === 'CUSTOMER') {
          return next()
        }
        return res.status(401).json({
          message: 'Only customer can access this endpoint'
        })
      }

      isAdmin = (req, res, next) => {
        if (req.sessionUser.role === 'ADMIN') {
          return next()
        }
        return res.status(401).json({
          message: 'Only admin can access this endpoint'
        })
      }
}

export default new authMiddleware();