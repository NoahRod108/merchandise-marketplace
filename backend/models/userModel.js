import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    cartItems:[
        {
            name: { type: String, required: true},
            quantity: { type: Number, required: true},
            image: { type: String, required: true},
            price: { type: Number, required: true},
            product: { 
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
        }
    ],
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema);

export default User