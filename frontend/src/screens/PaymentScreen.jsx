import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutProcess from '../components/CheckoutProcess';
import { useNavigate } from 'react-router-dom';
import { savePayment } from '../actions/cartActions';

const PaymentScreen = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.reducer.cart);
    const { shippingAddress } = cart;

    !shippingAddress && navigation('/shippinhg');

    const [payment, setPayment] = useState('paypal');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment({payment}));
        navigation('/placeorder');
    }

  return (
    <FormContainer>
        <CheckoutProcess step1 step2/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Payment Method</Form.Label>
                <Col>
                    <Form.Check type='radio' label='Paypal' id='Paypal' name='payment' value='Paypal' checked onChange={(e) => setPayment(e.target.value)}></Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' className='rounded my-3' variant='dark'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen