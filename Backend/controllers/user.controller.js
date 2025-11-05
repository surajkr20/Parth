import userModel from "../models/user.model.js";

export const getCurrentUser = async(req, res) =>{
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId).select("-password");
        if(!user){
            return res.status(400).json({message: "user not found"});
        }
        return res.status(400).json(user);
    } catch (error) {
        return res.status(500).json({message: `getting current user error: ${error}`});
    }
}
