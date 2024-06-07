import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


const router = express.Router();



const verifyRoute = async (req, res, next) => {
    try{
       // const token = req.jwt; 
         //const data = {userId, _id}; 
        //let token = jwt.sign(data, secret, {expiresIn: '15d'})
        //console.log(token);
        //jwt.verify(token, secret)

const token = req.headers.authorization;
if(!token){
    return res.status(401).json({error: "Unauthorized - No Token Provided"})
}

        const secret = 'my super secret';
        const decoded = jwt.verify(token, secret);
    
      
       // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
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
        console.log("user Verification Error:")
        res.status(500).json({ error: "verifyRoute Internal server error"});
    }
}
router.get("/", verifyRoute, async (req, res) => {
    try{
        const loggedInUserId= req.user._id;

        const allUsers = await User.find({ _id: { $ne: loggedInUserId}}).select("-password");
        res.status(200).json(allUsers);

    } catch(error){
        console.error("Error in user Route", error.message);
        res.status(500).json({ error: " user /get Internal server error"});

    }
})

export default router;