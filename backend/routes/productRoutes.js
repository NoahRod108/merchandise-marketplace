import express from 'express';
import { getProduct, getProducts, deleteProduct, updateProduct, createProduct, createReview } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Fetch all products
// api/products
router.route('/').get(getProducts).post(protect, admin, createProduct);

//Create review
router.route('/:id/reviews').post(protect, createReview);

// Fetch single product
// api/products/:id
router.route('/:id').get(getProduct).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);

export default router