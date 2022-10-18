import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Image, Card, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Navigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder, deliveredOrder } from '../actions/orderActions';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET, ORDER_DELIVERED_RESET } from '../constants/orderConstants';

const OrderScreen = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector(state => state.reducer.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.reducer.orderPay);
    const { success: paySuccess, loading: payLoading } = orderPay;

    const orderDelivered = useSelector(state => state.reducer.orderDelivered);
    const { success: deliveredSuccess, loading: deliveredLoading } = orderDelivered;

    const userLogin = useSelector(state => state.reducer.userLogin);
    const { userInfo } = userLogin;


    if(!loading){
        order.itemPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    }

    useEffect(() => {
        if(!userInfo){
            Navigate('/login');
        }

        const addPaypalScript = async() => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            }

            document.body.appendChild(script);
        }

        if(!order || paySuccess || deliveredSuccess){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVERED_RESET});

            dispatch(getOrderDetails(params.id));
        }else if(!order.isPaid){
            addPaypalScript();
        }else{
            setSdkReady(true);
        }

    }, [params, dispatch, order, paySuccess, deliveredSuccess, userInfo])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(params.id, paymentResult));
    }

    const deliveredHandler = () => {
        dispatch(deliveredOrder(order))
    }

  return loading ? <Loader /> : 
    error ? <Message variant='danger'>{error}</Message> : 
    <Container>
        <h1>Order: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    {/* Shipping address */}
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name: </strong>
                            {order.user.name}
                        </p>
                        <p>
                            <strong>Email: </strong>
                            <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <Message variant='success' timeout='show'>Delivered</Message>
                        ):(
                            <Message variant='warning' timeout='show'>Not Delivered</Message>
                        )}
                    </ListGroup.Item>
                    {/* Payment Method */}
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                            <strong>Choice of payment: </strong>
                            {order.payment}

                            {order.isPaid ? (
                            <Message variant='success' timeout='show'>Paid on {order.paidAt}</Message>
                            ):(
                                <Message variant='warning' timeout='show'>Not Paid</Message>
                            )}
                    </ListGroup.Item>
                    {/* Items ordered */}
                    <ListGroup.Item>
                        <h2 style={{marginBottom: "12px"}}>Your Order</h2>
                        <ListGroup variant='flush'>
                            <Row style={{textAlign: "center"}}>
                                <Col md={2}>
                                </Col>
                                <Col md={4}>
                                    Name
                                </Col>
                                <Col md={4}>
                                    Price
                                </Col>
                                <Col md={2}>
                                    Quantity
                                </Col>
                            </Row>
                            {order.orderItems.map(item => 
                                <ListGroup.Item key={item.product} className='cart--items'>
                                    <Row style={{textAlign: "center"}}>
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
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total Items:</Col>
                                <Col>${order.itemPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>     
                                <Col>Shipping:</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>    
                                <Col>Tax:</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {payLoading && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                )}
                            </ListGroup.Item>
                        )}
                        {deliveredLoading && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button type='button' className='btn w-100 rounded' onClick={deliveredHandler}>Mark As Delivered</Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </Container>
}

export default OrderScreen