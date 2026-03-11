<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");
=======
import express from "express";
const router = express.Router();
import * as userController from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
>>>>>>> d19f2668ad1c2c7e483807071a0bf0b2e052a2b2


//----PUBLIC ROUTES ----
//Anyone can register or log in 
router.post('/register', userController.register);
router.post('/login', userController.login);

//----PROTECTED ROUTES ----
// Must be logged in to access these routes
router.get('/profile', protect, userController.getUserProfile);
router.put('/profile', protect, userController.updateUserProfile);

//----ADMIN ROUTES ----
// Must be logged in and admin to access these routes
router.get('/admin/users', admin, userController.getAllUsers);
router.get('/admin/user/:id', admin, userController.getUserById);
router.put('/admin/user/:id', admin, userController.updateUserById);
router.delete('/admin/user/:id', admin, userController.deleteUserById);

module.exports = router; 
