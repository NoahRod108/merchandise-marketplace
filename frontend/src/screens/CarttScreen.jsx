import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart } from './../actions/cartActions';

const CarttScreen = () => {
    const params = useParams();
    const location = useLocation();
    const productId = params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();

    useEffect(() =>{
        productId && dispatch(addToCart(productId));
    }, [params, dispatch, productId])

    console.log(qty);

  return (
    <div>CarttScreen</div>
  )
}

export default CarttScreen