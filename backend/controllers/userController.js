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

export {authUser, getProfile, createUser}