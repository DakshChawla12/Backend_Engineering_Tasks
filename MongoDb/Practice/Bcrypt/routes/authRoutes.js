import express from 'express';
const router = express.Router();
import {signup,login} from '../controllers/authControllers.js';

router.route('/signup').post(signup);
router.route('/login').post(login);

export default router;