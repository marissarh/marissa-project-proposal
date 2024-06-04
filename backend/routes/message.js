import express from "express";
import jwt from 'jsonwebtoken';
import User from '../models/user.js'
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

const router = express.Router();


const verifyRoute = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer')) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }
        

        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Verification Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


router.post("/send/:id", verifyRoute, async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!message) {
            return res.status(400).json({ error: "Message field is required"});
        }
        

        const receiver = await User.findById(receiverId);
        if (!receiver){
            return res.status(404).json({ error: "Receiver not found"});
        }
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        //if (newMessage){
           // conversation.messages.push(newMessage._id); 

        //}

        await Promise.all([conversation.save(), newMessage.save()]);
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in message route:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:id", verifyRoute, async (req, res) => {
    try {
        const { id: userToMessageId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToMessageId] },
        }).populate("messages");

        if (!conversation) 
            return res.status(200).json([]);
        

        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in message route:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/search", async (req, res) => {
    try{
        const { keyword } = req.query;
        const messages = await Message.find({ $text: {search: keyword}});
        res.status(200).json(messages);
    } catch (error){
        console.errorO("Error in text search route:", error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
});

router.put("/update/:id", verifyRoute, async (req, res) => {
    try{
         const messageId = req.params.id;
         const {message} = req.body;
         const updatedMessage = await Message.findByIdAndUpdate(messageId, {message}, { new: true});

         if (!updatedMessage) {
            return res.status(404).json({ error: "Message not found"});
         }
         res.status(200).json(updatedMessage);
    } catch (error) {
        console.error("Error in updating message:", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.delete("/delete/:id", verifyRoute, async (req, res) => {
    try{
        const messageId = req.params.id;

        const deletedMessage = await Message.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({ error: "Message not found"});
        }
        res.status(200).json({message: "Message deleted successfully"});
    } catch (error){
        console.error("Error in deleting message:", error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
});

export default router;