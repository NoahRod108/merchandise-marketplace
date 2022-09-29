import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer } from './reducers/userReducer';
 
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    getUserDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
})

const cartLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const preloadedState = {
    reducer: {
        cart: {cartItems: cartLocalStorage},
        userLogin: {userInfo: userInfoLocalStorage},
    }
}

const middleware = [thunk];

const store = configureStore({
    reducer: {reducer},
    preloadedState,
    middleware: [...middleware],
})
 
export default store