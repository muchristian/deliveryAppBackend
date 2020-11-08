import express, { Router } from "express";
import authController from "../../controllers/authController";
import authMiddleware from '../../middlewares/authMiddleware';

const authRouter = express.Router();
const { login, signup, logout } = authController;
const { isUserAuthInAndVerified } = authMiddleware;

authRouter.post("/login", login);
authRouter.post("/signup",signup);
authRouter.get("/logout", isUserAuthInAndVerified, logout)

export default authRouter;
