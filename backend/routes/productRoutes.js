import express from 'express';
import { getProduct, getProducts } from '../controllers/productController.js';

const router = express.Router();

// Fetch all products
// api/products
router.route('/').get(getProducts)

// Fetch single product
// api/products/:id
router.route('/:id').get(getProduct);

export default router