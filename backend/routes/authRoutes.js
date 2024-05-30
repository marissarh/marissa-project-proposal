import express from "express";
import User from '../models/user.js'

const router = express.Router();

router.post("/signup", async (req, res) => {
    try{
        const {confirmPassword} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords don't match"})
        }
        const user = await User.findOne({username});
        if(user) {
            return res.status(400).json({error: "Username already exists"})
        }
    }catch(error){
    res.send("Sigup Route");
};
});
router.get("/login", (req, res) => {
    res.send("Login Route");
});
router.get("/logout", (req, res) => {
    res.send("Logout Route");
});


export default router;