import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart, removeFromCart } from './../actions/cartActions';

const CarttScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.reducer.cart);
    const { cartItems } = cart;

    const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        navigate('/login/?redirect=/shipping');
    }

  return (
    <Container>
        <Row>
        <Col md={8}>
            <h1 className='title'>Your Cart</h1>
            {
            cartItems.length === 0
            ? (
                <Message variant='info'>Cart is empty</Message>
            )
            : (
                <ListGroup variant='flush'>
                {cartItems.map(item => (
                    <ListGroup.Item key={item.product} className='cart--items'>
                    <Row>
                        <Col md={2}>
                        <Image src={item.image} fluid rounded />
                        </Col>
                        <Col md={3}>
                        <Link to={`/product/${item.product}`} style={{textDecoration:'none'}}>{item.name}</Link>
                        </Col>
                        <Col md={2}>
                        ${item.price}
                        </Col>
                        <Col>
                        <Form.Select value={item.quantity} onChange={(e) => 
                            dispatch(addToCart(item.product, Number(e.target.value)))}>
                            {
                            [...Array(item.countInStock).keys()].map(x => (
                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))
                            }  
                        </Form.Select>
                        </Col>
                        <Col md={2}>
                            <Button type='button' className='rounded' variant='light' disabled={item.countInStock === 0} onClick={() => removeFromCartHandler(item.product)}>
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
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Subtotal ({cartItems.reduce((acc, curItem) => acc + curItem.quantity, 0)}) items</h2>
                        ${cartItems.reduce((acc, curItem) => acc + curItem.quantity * curItem.price, 0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row className='m-1'>
                            <Button className='rounded' variant='dark' type='button' disabled={cartItems.length === 0} onClick={checkoutHandler}>Checkout</Button>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
        </Row>
    </Container>
  )
}

export default CarttScreen