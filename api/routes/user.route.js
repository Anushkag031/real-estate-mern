import express from 'express';
import { login, logout, register } from '../controllers/auth.controller.js';
import { deleteUser, getUser, getUsers, updatedUser } from '../controllers/user.controller.js';
import  verifyToken  from '../middleware/verifyToken.js';
const router= express.Router();

//routes
router.get('/',getUsers) // all users
router.get('/:id',verifyToken, getUser) //single user

router.put('/:id',verifyToken,updatedUser) //update user

router.delete('/:id',verifyToken,deleteUser) //delete user


export default router;