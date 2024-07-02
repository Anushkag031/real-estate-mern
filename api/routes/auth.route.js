import express from 'express';
import { login, logout, register } from '../controllers/auth.controller.js';

const router= express.Router();

//routes
router.post('/register',register) // register route

router.post('/login',login)

router.post('/logout',logout)


export default router;