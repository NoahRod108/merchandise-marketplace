import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart, removeFromCart } from './../actions/cartActions';
import { userUpdateCart } from '../actions/userActions';

const CarttScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.reducer.userLogin);
    const { userInfo } = userLogin;

    const userDetails = useSelector(state => state.reducer.getUserDetails);
    const { user } = userDetails;
    
    const cart = useSelector((state) => state.reducer.cart);
    const { cartItems } = cart;

    if(!localStorage.getItem('cartItems')){
        localStorage.setItem('cartItems', JSON.stringify(user.cartItems));
        dispatch(userUpdateCart(user.cartItems));
        window.location.reload();
    }

    const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        navigate('/login/?redirect=/shipping');
    }

    useEffect(() => {
        if(!userInfo){
            navigate('/');
        }
        dispatch(userUpdateCart(cartItems));
    },[cartItems, dispatch, navigate, userInfo])

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
                        <Col md={1}>
                            ${item.price}
                        </Col>
                        <Col md={4}>
                            <Col className='d-flex'>
                                <Button className="btn-sm rounded" onClick={() => 
                                    {
                                        if(item.quantity > 1){
                                            dispatch(addToCart(item.product, Number(item.quantity - 1)));
                                        }
                                    }    
                                }
                                >-</Button>
                                <Form.Control style={{width: "30%", margin: "0 8px"}} type='text' readOnly value={item.quantity}></Form.Control>
                                <Button className="btn-sm rounded" onClick={() => 
                                    {
                                        if(item.quantity < item.countInStock){
                                            dispatch(addToCart(item.product, Number(item.quantity + 1)));
                                        }
                                    }    
                                }
                                >+</Button>
                            </Col>
                        </Col>
                        <Col md={2}>
                            <Button type='button' className='rounded my-3' variant='dark' disabled={item.countInStock === 0} onClick={() => removeFromCartHandler(item.product)}>
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
            <Card className='cart--checkout--card'>
                <ListGroup variant='flush'>
                    <ListGroup.Item className='list--group'>
                        <h2>Subtotal ({cartItems.reduce((acc, curItem) => acc + curItem.quantity, 0)}) items</h2>
                        ${cartItems.reduce((acc, curItem) => acc + curItem.quantity * curItem.price, 0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item className='list--group'>
                        <Row className='m-1'>
                            <Button className='rounded my-3' variant='dark' type='button' disabled={cartItems.length === 0} onClick={checkoutHandler}>Checkout</Button>
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