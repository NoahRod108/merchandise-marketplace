import express from 'express';
import { addOrder, getOrder, updateOrderPayment, getSelectedOrder, getOrders, updateOrderDelivered } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrder).get(protect, admin, getOrders);

router.route('/myorders').get(protect, getSelectedOrder);

router.route('/:id').get(protect, getOrder);

router.route('/:id/pay').put(protect, updateOrderPayment);

router.route('/:id/delivered').put(protect, updateOrderDelivered);

export default router