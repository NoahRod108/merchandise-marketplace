import express from 'express';
import { addOrder, getOrder, updateOrderPayment, getSelectedOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrder);

router.route('/myorders').get(protect, getSelectedOrder);

router.route('/:id').get(protect, getOrder);

router.route('/:id/pay').put(protect, updateOrderPayment);

export default router