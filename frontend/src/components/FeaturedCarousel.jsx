import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { listFeaturedProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const FeaturedCarousel = () => {
    const dispatch = useDispatch();

    const featuredProducts = useSelector(state => state.reducer.featuredProducts)
    const { error, products } = featuredProducts;

    useEffect(() => {
        dispatch(listFeaturedProducts())
    },[dispatch])

  return error ? <Message variant='danger'>{error}</Message> : (
    <>
        <Carousel pause='hover' className='bg-dark'>
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption style={{textAlign: "right"}} className='carousel-caption mx-5'>
                            <h1 style={{color: "#fff"}}>Featured Product</h1>
                            <h3 style={{color: "#dbdbdb"}}>{product.name} - ${product.price}</h3>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    </>
  )
}

export default FeaturedCarousel