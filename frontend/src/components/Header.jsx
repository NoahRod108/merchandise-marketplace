import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import Search from './Search';

const Header = () => {
    const userLogin = useSelector(state => state.reducer.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    }

  return (
    <header>
        <Navbar expand="lg">
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand href="/">Spooky Shop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Search />
                    <Nav className="ms-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link href="/login"><i className='fas fa-user'></i>Login</Nav.Link>
                            </LinkContainer>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminMenu'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productList'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderList'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header