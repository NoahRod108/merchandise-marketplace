import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, userAdminUpdate } from '../actions/userActions';
import { USER_ADMIN_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.reducer.getUserDetails);
    const { loading, error, user } = userDetails;

    const adminUpdate = useSelector(state => state.reducer.userAdminUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success } = adminUpdate;

    useEffect(() => {
        if(success){
            dispatch({type: USER_ADMIN_UPDATE_RESET});
            navigate('/admin/userlist');
        }else{
            if(user._id !== params.id){
                dispatch(getUserDetails(params.id));
            }else{
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
        
    }, [user, dispatch, params, success, navigate])


    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(userAdminUpdate({_id: params.id, name, email, isAdmin}));
    }

  return (
    <Container>
        <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{error}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='isadmin'>
                    <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                </Form.Group>
                <Button type='submit' variant='primary'>Update</Button>
            </Form>
            )}
        </FormContainer>
    </Container>
  )
}

export default UserEditScreen