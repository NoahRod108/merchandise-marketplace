import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Button, Form, Table, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, userUpdate } from '../actions/userActions';
import { getOrderList } from '../actions/orderActions';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //get state of user
    const userDetails = useSelector(state => state.reducer.getUserDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.reducer.userLogin);
    const { userInfo } = userLogin;

    const updateProfile = useSelector(state => state.reducer.userUpdate);
    const { success } = updateProfile;

    const orderList = useSelector(state => state.reducer.orderList);
    const { orders, loading: orderListLoading, error: orderListError } = orderList;

    useEffect(() => {
        if(!userInfo){
            navigate('/login');
        }else{
            if(!user || !user.name){
                dispatch(getUserDetails('profile'))
                dispatch(getOrderList());
            }else{
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, userInfo, navigate, user])


    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(userUpdate({id: user._id, name, email, password }));
        }
    }

  return (
    <Container>
        <Row>
            <Col className='profile-update-form' md={3}>
                <h2>My Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile has been updated!</Message>}
                {loading && <Loader></Loader>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' className='rounded' variant='dark'>Update</Button>
                </Form>
            </Col>
            <Col className='profile-order-table' md={9}>
                <h2>My Orders</h2>
                {orderListLoading ? <Loader /> : orderListError ? <Message variant='danger'>{orderListError}</Message> : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{color: "red"}} />}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{color: "red"}} />}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='dark' className='rounded'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    </Container>
  )
}

export default ProfileScreen