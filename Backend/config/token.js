
import jwt from "jsonwebtoken";

const tokenGeneration = async (userId) =>{
    try {
        const token = await jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "24h"});
        return token;
    } catch (error) {
        console.log({message: "error in token generation"})
    }
}

export default tokenGeneration;