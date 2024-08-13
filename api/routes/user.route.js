import express from 'express';

import { deleteUser, getUser, getUsers, savePost, updatedUser,profilePosts } from '../controllers/user.controller.js';
import  {verifyToken } from '../middleware/verifyToken.js';
const router= express.Router();

//routes
router.get('/',getUsers) // all users
//router.get('/:id',verifyToken, getUser) //single user

router.put('/:id',verifyToken,updatedUser) //update user

router.delete('/:id',verifyToken,deleteUser) //delete user

router.post("/save",verifyToken,savePost) //save post

router.get("/profilePosts",verifyToken, profilePosts) //get profile posts)



export default router;