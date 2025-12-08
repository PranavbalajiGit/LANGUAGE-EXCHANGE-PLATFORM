import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const protectRoute = async(req , res , next)=> {
    try {
        const token = req.cookies.jwt;

        if(!token)
        {
            res.status(401).json({message : "Unauthorized - No token provided"});
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
        if(!decoded)
        {
            res.status(401).json({message: "Unauthorized - Invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user)
        {
            res.status(401).json({message:"Unauthorized - User Not found"})
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Error in Protect Route MiddleWare : ", error);
        res.status(500).json({message:"Internal Server Error"})
    }
}