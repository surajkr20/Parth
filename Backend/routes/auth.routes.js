import express from "express";
const authRoutes = express.Router();
import { signup, login, logout } from "../controllers/auth.controller.js";

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/logout', logout);

export default authRoutes;