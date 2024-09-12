import express from 'express';
import { addMessage } from '../controllers/message.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router= express.Router();

//routes
router.post('/:chatId',verifyToken,addMessage) // register route



export default router;