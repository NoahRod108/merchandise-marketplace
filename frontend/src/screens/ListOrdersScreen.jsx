import React, { useEffect } from 'react';
import { Button, Table} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getAdminOrderList } from '../actions/orderActions';

const ListOrdersScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderAdminList = useSelector(state => state.reducer.orderAdminList);
    const { loading, error, orders } = orderAdminList;

    const userLogin = useSelector(state => state.reducer.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(getAdminOrderList());
        }else{
            navigate('/login');
        }
    },[dispatch, navigate, userInfo])

  return (
    <>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map( order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.name}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{color: "red"}} />}</td>
                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{color: "red"}} />}</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='dark' className='rounded'><i className='fas fa-edit'></i>Details</Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
  )
}

export default ListOrdersScreen