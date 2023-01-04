import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';
import CheckoutProcess from '../components/CheckoutProcess';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.reducer.cart);
    const { cartItems, shippingAddress, payment } = cart;

    // Get prices for order summary
    cart.itemPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    cart.shippingPrice = cart.itemPrice > 100 ? 0 : 20;
    cart.taxPrice = Number.parseFloat((0.07 * cart.itemPrice)).toFixed(2);
    cart.totalPrice = Number.parseFloat(Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

    const addOrder = {
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        payment: payment.payment,
        itemPrice: cart.itemPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
    }

    const orderCreate = useSelector(state => state.reducer.orderCreate);
    const { order, success, error } = orderCreate;

    const placeOrderHandler = () => {
        dispatch(createOrder(addOrder))
    }

    useEffect(() => {
        if(success){
            navigate(`/order/${order._id}`);
        }
    }, [navigate, success])

  return (
    <Container>
        <CheckoutProcess step1 step2 step3/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    {/* Shipping address */}
                    <ListGroup.Item className='list--group'>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address: </strong>
                            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </ListGroup.Item>
                    {/* Payment Method */}
                    <ListGroup.Item className='list--group'>
                        <h2>Payment Method</h2>
                            <strong>Choice of payment: </strong>
                            {payment.payment}
                    </ListGroup.Item>
                    {/* Items ordered */}
                    <ListGroup.Item className='list--group'>
                        <h2>Your Order</h2>
                        <ListGroup variant='flush'>
                            {cartItems.map(item => 
                                <ListGroup.Item key={item.product} className='cart--items'>
                                <Row>
                                  <Col md={2}>
                                    <Image src={item.image} fluid rounded />
                                  </Col>
                                  <Col md={4}>
                                    {item.name}
                                  </Col>
                                  <Col md={4}>
                                    ${item.price}
                                  </Col>
                                  <Col md={2}>
                                    {item.quantity}
                                  </Col>
                                </Row>
                              </ListGroup.Item>    
                            )}
                        </ListGroup>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            {/* Order summary */}
            <Col md={4} className='list--group'>
                <Card className='payment--checkout--card'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total Items:</Col>
                                <Col>${cart.itemPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>     
                                <Col>Shipping:</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>    
                                <Col>Tax:</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item className='list--group'>
                            <Button type='button' className='rounded my-3' style={{width: "100%"}} variant='dark' onClick={placeOrderHandler}>Finish Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default PlaceOrderScreen