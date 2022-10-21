import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

// Auth user
// /api/users/login
const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne(
        {
            email: email
        }
    )

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

// Create user
// /api/users
const createUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User alreay exists!');
    }else{
        const user = await User.create({
            name,
            email,
            password
        })

        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        }else{
            res.status(400);
            throw new Error('invalid user');
        }
    }
   
})

// Get user profile
// /api/users/profile
const getProfile = asyncHandler( async (req, res) => {
    const user = req.user;

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(401);
        throw new Error('User not found');
    }
})

// Update user profile
// /api/users/profile
const updateProfile = asyncHandler( async (req, res) => {
    const user = req.user;

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    }else{
        res.status(404);
        throw new Error('User not found');
    }
})

// Get all users
// /api/users/profile
const getUsers = asyncHandler( async (req, res) => {
    const users = await User.find({})

    res.json(users);
})

// Delete user
// /api/users/profile
const deleteUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        await user.remove();

        res.json({message: "User removed"});
    }else{
        res.status(404);

        throw new Error("User not found");
    }

    res.json(user);
})

// Get user with and ID
// /api/users/profile
const getUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if(user){
        res.json(user);
    }else{
        res.status(404);

        throw new Error("User not found");
    }

})

// Update user
// /api/users/profile
const updateUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin
        
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }else{
        res.status(404);
        throw new Error('User not found');
    }
})

const updateCart = asyncHandler( async (req, res) => {
    console.log(req.body);
    // const user = await User.findById(req.params.id);

    // if(user){
    //     user.cartItems = req.body.cartItems || user.cartItems;
        
    //     const updatedUser = await user.save();

    //     res.json({
    //         _id: updatedUser._id,
    //         cartItems: updatedUser.cartItems,
    //     })
    // }else{
    //     res.status(404);
    //     throw new Error('User not found');
    // }
})

export {authUser, getProfile, createUser, updateProfile, getUsers, deleteUser, updateUser, getUser, updateCart}