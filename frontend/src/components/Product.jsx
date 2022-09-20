import React from 'react';
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
  return (
    <>
        <Card className='my-3 rounded'>
            <a href={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} />
            </a>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    <div className="my-3">
                        {product.rating} from {product.numReviews} reviews
                    </div>
                </Card.Text>
                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    </>
  )
}

export default Product