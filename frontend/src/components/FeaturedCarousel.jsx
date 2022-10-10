import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listFeaturedProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const FeaturedCarousel = () => {
    const dispatch = useDispatch();

    const featuredProducts = useSelector(state => state.reducer.featuredProducts)
    const { loading, error, products } = featuredProducts;

    useEffect(() => {
        dispatch(listFeaturedProducts())
    },[dispatch])

  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
    <Carousel pause='hover' className='bg-dark'>
        {products.map(product => (
            <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid />
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{product.name} - {product.price}</h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  )
}

export default FeaturedCarousel