import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Product from './../components/Product';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import FeaturedCarousel from '../components/FeaturedCarousel';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const searchWord = params.searchword;
    const pageNumber = params.pagenumber || 1;

    const productList = useSelector(state => state.reducer.productList);
    const { loading, error, products, page, pages } = productList;

    useEffect(() =>{
        dispatch(listProducts(searchWord, pageNumber));
    }, [dispatch, searchWord, pageNumber]);

  return (
    <>
        {!searchWord && <FeaturedCarousel />}
        <h1>Latest Products</h1>
        {loading ? (<Loader />)
        : error ? (<Message variant='danger'>{error}</Message>)
        : (
            <>
                <Row>
                    {products.map((product) => (
                        <Col className='align-items-stretch d-flex' key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
                <Paginate pages={pages} page={page} searchWord={searchWord ? searchWord : ''}/>
            </>
        )}
    </>
  )
}

export default HomeScreen