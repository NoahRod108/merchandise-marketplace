import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_DETAILS_RESET, PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productDetails = useSelector(state => state.reducer.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector(state => state.reducer.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success } = productUpdate;

    useEffect(() => {
        if(success){
            dispatch({type: PRODUCT_UPDATE_RESET});
            dispatch({type: PRODUCT_DETAILS_RESET});
            navigate('/admin/productlist');
        }else{
            if(!product.name || product._id !== params.id){
                dispatch(listProductDetails(params.id));
            }else{
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [product, dispatch, params, navigate, success])

    const uploadFileHandler = async (e) =>{
        console.log(e);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config);

            setImage(data);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: product._id,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }));
    }

  return (
    <Container>
        <Link to='/admin/productlist' className='rounded btn btn-dark my-3'>Go Back</Link>
            <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='text' label='Enter Image URL' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control type="file" onChange={uploadFileHandler}/>
                    {uploading && <Loader />}
                </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type='text' label='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type='text' label='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='countInStock'>
                    <Form.Label>Count in stock</Form.Label>
                    <Form.Control type='number' label='Enter stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' label='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' className='rounded my-3' variant='dark'>Update</Button>
            </Form>
            )}
        </FormContainer>
    </Container>
  )
}

export default ProductEditScreen