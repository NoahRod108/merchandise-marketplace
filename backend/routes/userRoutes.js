import express from 'express';
import { authUser, getProfile, createUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);

router.route('/profile').get(protect, getProfile);

router.route('/').post(createUser);

export default router