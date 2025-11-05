import express from "express";
const userRouter = express.Router();
import { getCurrentUser } from "../controllers/user.controller.js";

userRouter.post('/me', getCurrentUser);

export default userRouter;