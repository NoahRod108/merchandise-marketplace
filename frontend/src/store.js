import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers';
 
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
})

const cartLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const preloadedState = {
    reducer: {
        cart: {cartLocalStorage}
    }
}

const middleware = [thunk];

const store = configureStore({
    reducer: {reducer},
    preloadedState,
    middleware: [...middleware],
})
 
export default store