import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//1. Register USER
exports.register = async (req, res) => {
    try {
        const {name, email, password} = req.body; 
        
        //Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        //Hash Password 
        const hashPassword = await bcrypt.hash(password, 10);

        //Create User
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create and Save User 
        const newUser = await User.create ({name , email, password: hashPassword});
        res.status(201).json({message: "User Registered Successfully", user: { id: newUser._id, name, email } });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

//2. Login USER
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        //Check if user exists
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "User not found"});
        }

        //Check Password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({message: "Invalid Password"});
        }

        //Generate Token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        //Send Response
        res.status(200).json({message: "User Logged In Successfully", token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

