import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        minlength: 7
    },
    role: {
        type: String,
        enum: ['admin', 'regular'],
        default: 'regular'
    }

}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;