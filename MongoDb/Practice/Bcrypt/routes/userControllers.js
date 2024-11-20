import express from 'express';
const router = express.Router();
import {authenticateToken} from '../utils.js';
import {getProfile} from '../controllers/userControllers.js';

router.route('/')
    get(authenticateToken,getProfile);

export default router;