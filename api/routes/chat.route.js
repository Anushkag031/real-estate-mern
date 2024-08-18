import express from 'express';

import {  getChats, getChat,addChat,readChat} from '../controllers/chat.controller.js';
import  {verifyToken } from '../middleware/verifyToken.js';
const router= express.Router();

//routes
router.get('/',verifyToken, getChats) // all users
router.get('/:id',verifyToken, getChat) //single user

router.post('/',verifyToken,addChat) //update user


router.post("/read/:id",verifyToken,readChat) //save post
//router.get('/posts/:id', getPost);




export default router;