import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart } from './../actions/cartActions';

const CarttScreen = () => {
    const params = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const productId = params.id;

    const qty = new URLSearchParams(location.search).get('qty');
    const cart = useSelector((state) => state.reducer.cart);
    const { cartItems } = cart;

    useEffect(() =>{
        productId && dispatch(addToCart(productId, qty));
    }, [params, dispatch, productId, qty])

  return (
    <div>CarttScreen</div>
  )
}

export default CarttScreen