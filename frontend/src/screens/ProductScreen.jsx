import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from './../components/Rating';
import axios from 'axios';

const ProductScreen = () => {
    const [product, setProduct] = useState({});
    const params = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`/api/products/${params.id}`);

            setProduct(res.data);
        }

        fetchProduct();
    }, [params])

  return (
    <>
        <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
        <Row>
            <Col md={6}>
                <Image src={product.image} fluid/>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: {product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
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
                                    <strong className={product.countInStock === 0 ? 'text-danger' : undefined}>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row className='m-1'>
                                <Button className='rounded' type='button' disabled={product.countInStock === 0}>Add to Cart</Button>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default ProductScreen