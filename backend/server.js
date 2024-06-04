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

//app.get("/", (req, res) => {
   // res.send("Hello World");
//});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



app.listen(PORT, () => {
    mongoDb();

    console.log(`Server running on port ${PORT}`)
});