import express from "express";
const userRouter = express.Router();
import { getCurrentUser } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";

userRouter.get('/me', isAuth, getCurrentUser);

export default userRouter;