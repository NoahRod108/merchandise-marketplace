import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productCreateReviewReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer, userListReducer, userDeleteReducer, userAdminUpdateReducer } from './reducers/userReducer';
import { orderAdminListReducer, orderCreateReducer, orderDeliveredReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from './reducers/orderReducers';
 
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productCreateReview: productCreateReviewReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    userAdminUpdate: userAdminUpdateReducer,
    userDelete: userDeleteReducer,
    getUserDetails: userDetailsReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDelivered: orderDeliveredReducer,
    orderList: orderListReducer,
    orderAdminList: orderAdminListReducer,
})

const cartLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddressLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};

const preloadedState = {
    reducer: {
        cart: {cartItems: cartLocalStorage, shippingAddress: shippingAddressLocalStorage},
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