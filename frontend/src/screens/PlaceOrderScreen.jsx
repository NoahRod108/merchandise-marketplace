import React, { useState } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';
import { savePayment } from '../actions/cartActions';
import CheckoutProcess from '../components/CheckoutProcess';

const PlaceOrderScreen = () => {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.reducer.cart);
    const { cartItems, shippingAddress, payment } = cart;

  return (
    <>
        <CheckoutProcess step1 step2 step3/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address: </strong>
                            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Choice of payment: </strong>
                            {payment.payment}
                        </p>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen