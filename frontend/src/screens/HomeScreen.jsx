import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Product from './../components/Product';
import { Row, Col, Container } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import { getUserDetails } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import FeaturedCarousel from './../components/FeaturedCarousel';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const searchWord = params.searchword;
    const pageNumber = params.pagenumber || 1;

    const productList = useSelector(state => state.reducer.productList);
    const { loading, error, products, page, pages } = productList;

    const userDetails = useSelector(state => state.reducer.getUserDetails);

    useEffect(() =>{
        dispatch(listProducts(searchWord, pageNumber));
        dispatch(getUserDetails('profile'))
    }, [dispatch, searchWord, pageNumber]);

  return (
    <>
    {!searchWord && <FeaturedCarousel />}
    <Container>
        <h1 className='m-3'>Latest Products</h1>
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
    </Container>
    </>
  )
}

export default HomeScreen