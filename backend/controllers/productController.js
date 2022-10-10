import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// Fetch all products
// /api/products
const getProducts = asyncHandler( async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pagenumber) || 1;

    const searchWord = req.query.searchword ? 
    { 
        name: {
            $regex: req.query.searchword,
            $options:  'i',
        }
    } : {}
    
    const count = await Product.countDocuments({...searchWord})
    const products = await Product.find({...searchWord}).limit(pageSize).skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// Fetch single product
// /api/products/:id
const getProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product){
        res.json(product)
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
})

// Delete product
// /api/products/:id
const deleteProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product){
        await product.remove();

        res.json({ message: "Product removed" });
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
})

// Create product
// /api/products
const createProduct = asyncHandler( async (req, res) => {
    const product = new Product({
        name: "Sample Name",
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: '0',
        numReviews: 0,
        description: 'Sample Description'
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
})

// Update product
// /api/products/:id
const updateProduct = asyncHandler( async (req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    }else{
        res.status(404);

        throw new Error("product not found");
    }

})

// Create review
// /api/products/:id/review
const createReview = asyncHandler( async (req, res) => {
    const {rating, comment} = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        const hasReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())

        if(hasReviewed){
            res.status(400);

            throw new Error("Already made a review");
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({message: 'Review added'});
    }else{
        res.status(404);

        throw new Error("product not found");
    }

})

// Get fetured products
// /api/products/featured
const getFeaturedProducts = asyncHandler( async (req, res) => {
    const products = await Product.find({}).sort({rating: - 1}).limit(5);

    res.json(products);
})

export {getProducts, getProduct, deleteProduct, updateProduct, createProduct, createReview, getFeaturedProducts}