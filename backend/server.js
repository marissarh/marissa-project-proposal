import express from "express";
import dotenv from "dotenv";

import auth from './routes/auth.js';
import message from './routes/message.js';
import user from './routes/user.js';

import mongoDb from "./db/MongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;


dotenv.config();

app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/message", message);
app.use("/api/users", user);







app.listen(PORT, () => {
    mongoDb();

    console.log(`Server running on port ${PORT}`)
});
