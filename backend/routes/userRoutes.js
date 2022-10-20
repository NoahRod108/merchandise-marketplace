import express from 'express';
import { authUser, getProfile, createUser, updateProfile, getUsers, deleteUser, getUser, updateUser, updateCart } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);

router.put('/cart', updateCart);

router.route('/profile').get(protect, getProfile).put(protect, updateProfile);

router.route('/').post(createUser).get(protect, admin, getUsers);

router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUser).put(protect, admin, updateUser);

export default router