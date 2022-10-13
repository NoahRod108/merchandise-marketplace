import React from 'react';
import { Card } from 'react-bootstrap'
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-2 rounded home--product'>
        <Link style={{textDecoration: "none"}} to={`/product/${product._id}`}>
        <Card.Img style={{height: "400px", width: "100%", objectFit: "cover", borderRadius: "5px"}} variant="top" src={product.image} />
        <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text as='div'>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </Card.Text>
            <Card.Text as='h3'>
                ${product.price}
            </Card.Text>
        </Card.Body>
        </Link>
    </Card>
  )
}

export default Product