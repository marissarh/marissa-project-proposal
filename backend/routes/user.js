import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


const router = express.Router();



const verifyRoute = async (req, res, next) => {
    try{
        const token = req.jwt;

        if (!token) {
            return res.status(401).json(
                { error: "Unauthorized = No Token Provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error: "Unauthorized - No Token Provided"});
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found"});
        }
        req.user = user

        next()

    }
    catch(error){
        console.log("Verification Error:", error.message)
        res.status(500).json({ error: "Internal server error"});
    }
}
router.get("/", verifyRoute, async (req, res) => {
    try{
        const loggedInUserId= req.user._id;

        const allUsers = await User.find({ _id: { $ne: loggedInUserId}}).select("-password");
        res.status(200).json(allUsers);

    } catch(error){
        console.error("Error in user Route", error.message);
        res.status(500).json({ error: " Internal server error"});

    }
})

export default router;