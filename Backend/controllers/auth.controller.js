import tokenGeneration from "../config/token.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

// signup controller
export const signup = async(req, res) =>{
    try {
        const {name, email, password} = req.body;
        const existEmail = await UserModel.findOne({email});
        if(existEmail){
            return res.status(400).json({message: "Email Already Registered"});
        }
        if(password.length > 5){
            return res.status(400).json({message: "password must be atleast 6 characters"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            name,
            password: hashedPassword,
            email
        })
        const token = tokenGeneration(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7*24*60*60*1000,
            sameSite: "strict",
            secure: false
        });
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({message: `signup error ${error}`})
    }
}

// login controller
export const login = async(req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({message: "Email Not Exist! signup now"});
        }
        if(password.length > 5){
            return res.status(400).json({message: "password must be atleast 6 characters"})
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            return res.status(500).json({message: `invalid email or password`});
        }
        const token = tokenGeneration(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7*24*60*60*1000,
            sameSite: "strict",
            secure: false
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: `login error ${error}`})
    }
}

// logout controller
export const logout = async(req, res) =>{
    try {
        res.clearCookie("token");
        return res.status(200).json({message: 'logout successfully'});
    } catch (error) {
        return res.status(500).json({message: `logout error ${error}`})
    }
}