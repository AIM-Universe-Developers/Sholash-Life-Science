const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//1. Register USER
export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body; 
        
        //Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        //Hash Password 
        const hashPassword = await bcrypt.hash(password, 10);

        //Create and Save User 
        const newUser = await User.create ({name , email, password: hashPassword});
        res.status(201).json({message: "User Registered Successfully", user: { id: newUser._id, name, email } });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

//2. Login USER
export const login = async (req, res) => {
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
// 3. Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

<<<<<<< HEAD
// 4. Update User Profile
exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = await bcrypt.hash(req.body.password, 10);
            }

            const updatedUser = await user.save();
            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// 5. Admin: Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// 6. Admin: Get User By ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// 7. Admin: Update User By ID
exports.updateUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;

            const updatedUser = await user.save();
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// 8. Admin: Delete User By ID
exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.status(200).json({ message: "User removed" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
=======
// 3. Get User Profile
export const getUserProfile = async (req, res) => {
    res.status(501).json({ message: "Not implemented" });
};

// 4. Update User Profile
export const updateUserProfile = async (req, res) => {
    res.status(501).json({ message: "Not implemented" });
};

// 5. Get All Users (Admin)
export const getAllUsers = async (req, res) => {
    res.status(501).json({ message: "Not implemented" });
};

// 6. Get User By ID (Admin)
export const getUserById = async (req, res) => {
    res.status(501).json({ message: "Not implemented" });
};

// 7. Update User By ID (Admin)
export const updateUserById = async (req, res) => {
    res.status(501).json({ message: "Not implemented" });
};

// 8. Delete User By ID (Admin)
export const deleteUserById = async (req, res) => {
    res.status(501).json({ message: "Not implemented" });
>>>>>>> d19f2668ad1c2c7e483807071a0bf0b2e052a2b2
};
