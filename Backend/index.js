import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// user routes
app.use('/api/auth', authRoutes);

app.listen(port, ()=>{
    connectDB();
    console.log(`server started at port ${port}`)
}) 
