import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// Create new order
// /api/orders
const addOrder = asyncHandler( async (req, res) => {
    const { orderItems, shippingAddress, payment, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);

        throw new Error('No order items');
    }else{
        const order = new Order({ user: req.user._id, orderItems, shippingAddress, payment, itemPrice, taxPrice, shippingPrice, totalPrice });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
})

// Get Order
// /api/orders/:id
const getOrder = asyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(order){
        res.json(order);
    }else{
        res.status(404);

        throw new Error('Order not found');
    }
})

// Get Order
// /api/orders/:id/pay
const updateOrderPayment = asyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    }else{
        res.status(404);

        throw new Error('Order not found');
    }
})

// Update delivered status
// /api/orders/:id/delivered
const updateOrderDelivered = asyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        
        const updatedOrder = await order.save();

        res.json(updatedOrder);
    }else{
        res.status(404);

        throw new Error('Order not found');
    }
})

// Get selected order
// /api/orders/myorders
const getSelectedOrder = asyncHandler( async (req, res) => {
    const orders = await Order.find({user: req.user._id});

    res.json(orders)
})

// Get all orders
// /api/orders/myorders
const getOrders = asyncHandler( async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');

    res.json(orders)
})



export {addOrder, getOrder, updateOrderPayment, getSelectedOrder, getOrders, updateOrderDelivered}