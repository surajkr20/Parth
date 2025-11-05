import express from "express";
const authRouter = express.Router();
import { signup, login, logout } from "../controllers/auth.controller.js";

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/logout', logout);

export default authRouter;