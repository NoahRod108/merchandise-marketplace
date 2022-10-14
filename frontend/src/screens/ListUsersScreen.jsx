import React, { useEffect } from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';

const ListUsersScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userList = useSelector(state => state.reducer.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector(state => state.reducer.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector(state => state.reducer.userDelete);
    const { success } = userDelete;

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers());
        }else{
            navigate('/login');
        }
    },[dispatch, navigate, userInfo, success])

    const deleteHandler = (id) => {
        if(window.confirm('Delete user?')){
            dispatch(deleteUser(id));
        }
    }

  return (
    <Container>
        <h1>List of Users</h1>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map( user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? <i className='fas fa-check' style={{color: "green"}}></i> : <i className='fas fa-times' style={{color: "red"}}></i>}</td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='dark' className='rounded'><i className='fas fa-edit'></i></Button>
                                </LinkContainer>
                                <Button variant='danger' className='rounded' onClick={() => deleteHandler(user._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </Container>
  )
}

export default ListUsersScreen