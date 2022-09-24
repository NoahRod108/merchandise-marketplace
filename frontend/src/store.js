import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
 
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
})

const middleware = [thunk];

const store = configureStore({
    reducer: {reducer},
    preloadedState: {},
    middleware: [...middleware],
})
 
export default store