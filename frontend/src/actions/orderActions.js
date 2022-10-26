import axios from "axios";
import { ORDER_ADMIN_LIST_FAIL, ORDER_ADMIN_LIST_REQUEST, ORDER_ADMIN_LIST_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVERED_FAIL, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, } from '../constants/orderConstants';

export const createOrder = (order) => async(dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { reducer: { userLogin: { userInfo }}} = getState()

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post('/api/orders', order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

export const getOrderDetails = (id) => async(dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { reducer: { userLogin: { userInfo }}} = getState()

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/orders/${id}`, config);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

export const payOrder = (id, paymentResult) => async(dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const { reducer: { userLogin: { userInfo }}} = getState()

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config);

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

export const getOrderList = () => async(dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })

        const { reducer: { userLogin: { userInfo }}} = getState()

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/orders/myorders`, config);

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

export const getAdminOrderList = () => async(dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_ADMIN_LIST_REQUEST
        })

        const { reducer: { userLogin: { userInfo }}} = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/orders`, config);

        dispatch({
            type: ORDER_ADMIN_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_ADMIN_LIST_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

export const deliveredOrder = (order) => async(dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_DELIVERED_REQUEST
        })

        const { reducer: { userLogin: { userInfo }}} = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`/api/orders/${order._id}/delivered`, {}, config);

        dispatch({
            type: ORDER_DELIVERED_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_DELIVERED_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}