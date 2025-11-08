import userModel from "../models/user.model.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";

export const getCurrentUser = async(req, res) =>{
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId).select("-password");
        if(!user){
            return res.status(400).json({message: "user not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: `getting current user error ${error}`});
    }
}

export const updateAssistant = async(req, res) =>{
    try {
        const {assistantName, assistantImage} = req.body;
        let finalImage;
        if(req.file){
            finalImage = await uploadOnCloudinary(req.file.path);
        }else{
            finalImage = assistantImage;
        }
        const user = await userModel.findByIdAndUpdate(req.userId, {
            assistantName, assistantImage: finalImage
        }, {new: true}).select("-password");
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: `update Assistant error: ${error}`});
    }
}