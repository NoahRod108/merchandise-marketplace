import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_PAYMENT, CART_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) =>{
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            quantity: qty
        }
    })
    
    // const cart = {
    //     product: data._id,
    //     name: data.name,
    //     image: data.image,
    //     price: data.price,
    //     countInStock: data.countInStock,
    //     quantity: qty
    // }

    // dispatch({
    //     type: 'USER_CART_UPDATE_REQUEST'
    // })

    // const { reducer: { userLogin: { userInfo }}} = getState()

    // const config = {
    //     headers:{
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${userInfo.token}`,
    //     },
    // }

    // const { cartData } = await axios.put(`/api/users/cartItems`, {userInfo, cart}, config);

    // dispatch({
    //     type: 'USER_CART_UPDATE_SUCCESS',
    //     payload: cartData,
    // })

    localStorage.setItem('cartItems', JSON.stringify(getState().reducer.cart.cartItems));
}

export const removeFromCart = (id) => (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().reducer.cart.cartItems));
}

export const saveShippingAddress = (data) => (dispatch) => {

    dispatch({
        type: CART_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePayment = (data) => (dispatch) => {

    dispatch({
        type: CART_PAYMENT,
        payload: data,
    })
}