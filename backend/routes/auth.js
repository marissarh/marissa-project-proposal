import bcrypt from "bcrypt";
import express from "express";
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken.js';


const router = express.Router();



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
            password: hashedPassword,
            role: 'regular'
        });
            await newUser.save();
            const token = generateToken(newUser._id);
        
        res.status(201).json({
            token,
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            role: newUser.role
        });
   
    }catch(error){
        console.error("Error in signup route");
        
        res.status(500).json(error, "Error")
   
};
});

router.post("/signup", async (req, res) => {
    try{
        const {confirmPassword, password, fullName, username} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json(error, "Passwords don't match");
        }
        const existingUser = await User.findOne({username});
        if(existingUser) {
            return res.status(400).json(error, "Username already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new User({
            fullName,
            username,
            password: hashedPassword,
            role: 'admin'
        });
            await newAdmin.save();
        
        res.status(201).json({ message: "Admin user created successfully"});
        
   
    }catch(error){
        console.error("Error in signup route",error.message);
        
        res.status(500).json(error, "Error during admin signup");
   
};
});


router.post("/login", async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || " ");

        if (!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"});
        }
        
        if (user.role === 'admin'){
            const token = generateToken(user._id);
            console.log(token)
            return res.status(200).json({
                token,
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                role: user.role
            });
        }
        else{
            const token = generateToken(user._id);

        console.log(token);
        res.status(200).json({
            token,
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            role: user.role
        });
        }
        
        
    } catch (error) {
        console.log("Error in login route", error.message);
        res.status(500).json({ error: "Login route error"});
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