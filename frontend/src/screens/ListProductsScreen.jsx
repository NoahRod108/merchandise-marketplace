import React, { useEffect } from 'react';
import { Button, Table, Row, Col, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Paginate from '../components/Paginate';

const ListProductsScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const pageNumber = params.pagenumber || 1;

    const productList = useSelector(state => state.reducer.productList);
    const { loading, error, products, pages, page } = productList;

    const productDelete = useSelector(state => state.reducer.productDelete);
    const { error: errorDelete, success } = productDelete;

    const productCreate = useSelector(state => state.reducer.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

    const userLogin = useSelector(state => state.reducer.userLogin);
    const { userInfo } = userLogin;

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            navigate('/login');
        }

        if(successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts('', pageNumber))
        }
    },[dispatch, navigate, userInfo, success, successCreate, createdProduct, pageNumber])

    const deleteHandler = (id) => {
        if(window.confirm('Delete product?')){
            dispatch(deleteProduct(id));
        }
    }

  return (
    <Container>
        <Row className='align-items-center'>
            <Col>
                <h1>List of Products</h1>
            </Col>
            <Col style={{textAlign: "right"}}>
                <Button className='my-3 rounded' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
        </Row>
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map( product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='dark' className='rounded'><i className='fas fa-edit'></i></Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='rounded' onClick={() => deleteHandler(product._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} admin={true} />
            </>
        )}
    </Container>
  )
}

export default ListProductsScreen