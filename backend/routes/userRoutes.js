import express from "express";
import router from "express";
import userController from "../controllers/userController";
import { protect, admin } from "../middleware/authMiddleware";


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

export default router; 
