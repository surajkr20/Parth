import express from "express";
const userRouter = express.Router();
import { getCurrentUser, updateAssistant } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

userRouter.get('/me', isAuth, getCurrentUser);
userRouter.post('/update', isAuth, upload.single("assistantImage"), updateAssistant);

export default userRouter;