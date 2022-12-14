import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form, Container } from 'react-bootstrap'
import Rating from './../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, createReviewProduct } from '../actions/productActions';
import { addToCart } from './../actions/cartActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    
    const cart = useSelector((state) => state.reducer.cart);
    const { cartItems } = cart;

    const productDetails = useSelector(state => state.reducer.productDetails);
    const { loading, error, product } = productDetails;

    const productCreateReview = useSelector(state => state.reducer.productCreateReview);
    const { error: reviewError, success } = productCreateReview;

    const userLogin = useSelector(state => state.reducer.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(success){
            alert('Review has been submitted');
            setRating(0);
            setComment('');
        }
        dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
        dispatch(listProductDetails(params.id));
    }, [params, dispatch, success, cartItems]);

    const addToCartHandler = () => {
        dispatch(addToCart(params.id, qty))
        navigate(`/cart/${params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createReviewProduct(params.id, {rating, comment}));
    }

  return (
    <Container className='product-container'>
        <Link className='btn rounded btn-dark my-3' to='/'>Go Back</Link>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <>
                <Row>
                    <Col md={6}>
                        <Image src={product.image} fluid rounded/>
                    </Col>
                    <Col md={6}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {product.description}
                            </ListGroup.Item>
                        </ListGroup>

                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        <strong className={product.countInStock <= 10 ? 'text-danger' : undefined}>
                                        {
                                            product.countInStock > 0 ? 
                                            product.countInStock <= 10 ? `In Stock (${product.countInStock}) Left` : 'In Stock' : 'Out of Stock'
                                        }
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Quantity:
                                        </Col>
                                        <Col className='d-flex'>
                                            <Button className="btn-sm rounded" onClick={() => 
                                                {
                                                    if(qty > 1){
                                                        setQty(qty - 1)
                                                    }
                                                }    
                                            }
                                            >-</Button>
                                            <Form.Control style={{width: "30%", margin: "0 8px"}} type='text' readOnly value={qty}></Form.Control>
                                            <Button className="btn-sm rounded" onClick={() => 
                                                {
                                                    if(qty < product.countInStock){
                                                        setQty(qty + 1)
                                                    }
                                                }    
                                            }
                                            >+</Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item className='list--group'  style={{marginBottom: "1rem"}}>
                                <Row className='m-1'>
                                    <Button className='rounded' variant='dark' type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>Add to Cart</Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && <Message variant='info' timeout='show'>There are no reviews for this product</Message>}
                        <ListGroup variant='flush' className='list--group'>
                            {product.reviews.map(review => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating}/>
                                    <p>{review.createdAt.substring(0,10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item className='list--group'>
                                <h2>Leave a Review</h2>
                                {reviewError && <Message variant='danger'>{reviewError}</Message>}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                <option value=''>Select...</option>
                                                <option value='1'>1 - poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Average</option>
                                                <option value='4'>4 - Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Button type='submit' variant='dark' className='rounded my-3'>Submit</Button>
                                    </Form>
                                ) : <Message variant='info' timeout='show'>Please <Link to='/login'>log in</Link> to leave a review</Message>}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </>
        )}
    </Container>
  )
}

export default ProductScreen