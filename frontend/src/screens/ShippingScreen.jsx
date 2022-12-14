import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutProcess from '../components/CheckoutProcess';

const ShippingScreen = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.reducer.cart);
    const { shippingAddress } = cart;

    const userLogin = useSelector(state => state.reducer.userLogin);
    const { userInfo } = userLogin;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        navigation('/payment');
    }

    useEffect(() =>{
        if(!userInfo){
            navigation('/login');
        }
    }, [userInfo, navigation])

  return (
    <FormContainer>
        <CheckoutProcess step1 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' required placeholder='Enter address' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' required placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type='text' required placeholder='Enter postal code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' required placeholder='Enter country' value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' className='rounded my-3' variant='dark'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen