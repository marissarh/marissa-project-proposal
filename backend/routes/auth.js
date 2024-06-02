import bcrypt from "bcrypt";
import express from "express";
import User from '../models/user.js';
import jwt from 'jsonwebtoken'


const router = express.Router();

const generateToken = (userId) => {
    return jwt.sign({ userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

};

router.post("/signup", async (req, res) => {
    try{
        const {confirmPassword, password, fullName, username} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords don't match"});
        }
        const existingUser = await User.findOne({username});
        if(existingUser) {
            return res.status(400).json({error: "Username already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword
        });

        await newUser.save();

        const token = generateToken(newUser._id);
        res.status(201).json({
            token,
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username
        });
   
    }catch(error){
        console.error("Error in signup route",error.message);
        
        res.status(500).json(error, "Internal Server Error");
   
};
});
router.post("/login", async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrent = await bcrypt.compare(password, user?.password || " ");

        if (!user || !isPasswordCorrent){
            return res.status(400).json({error: "Invalid username or password"});
        }

        const token = generateToken(user._id);
        res.status(200).json({
            token,
            _id: user._id,
            fullName: newUser.fullName,
            username: newUser.username
        });
        
    } catch (error) {
        console.log("Error in login route", error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
});


router.post("/logout", async (req, res) => {
    try{
        res.status(200).json({message: "Logged out successfully"});    
    } catch( error){
        console.log("Error in logout route", error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
});


export default router;