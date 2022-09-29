import express from 'express';
import { authUser, getProfile, createUser, updateProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);

router.route('/profile').get(protect, getProfile).put(protect, updateProfile);

router.route('/').post(createUser);

export default router