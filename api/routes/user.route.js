import express from 'express';

import { deleteUser, getUser, getUsers,    profilePosts,    savePost,  updatedUser } from '../controllers/user.controller.js';
import  {verifyToken } from '../middleware/verifyToken.js';
import { getPost } from '../controllers/post.controller.js';
const router= express.Router();

//routes
router.get('/',getUsers) // all users
router.get('/:id',verifyToken, getUser) //single user

router.put('/:id',verifyToken,updatedUser) //update user

router.delete('/:id',verifyToken,deleteUser) //delete user

router.post("/save",verifyToken,savePost) //save post
//router.get('/posts/:id', getPost);

router.get("/profilePosts",verifyToken, profilePosts) //get profile posts)



export default router;