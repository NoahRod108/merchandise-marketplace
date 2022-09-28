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

    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const cart = useSelector((state) => state.reducer.cart);
    const { cartItems } = cart;

    const removeFromCartHandler = (id) => {
      console.log('remove');
    }

  return (
    <Row>
      <Col md={8}>
        <h1>Your Cart</h1>
        {
          cartItems.length === 0
          ? (
            <Message>Cart is empty</Message>
          )
          : (
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      {item.price}
                    </Col>
                    <Col>
                      <Form.Select value={item.qty} onChange={(e) => 
                        dispatch(addToCart(item.product, Number(e.target.value)))}>
                        {
                          [...Array(item.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                          ))
                        }  
                      </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Button type='button' className='rounded' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )
        }
      </Col>
      <Col md={2}>
        <h1>test</h1>
      </Col>
      <Col md={2}>
        
      </Col>
    </Row>
  )
}

export default CarttScreen