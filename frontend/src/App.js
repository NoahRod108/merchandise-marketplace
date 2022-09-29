import React from 'react'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CarttScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

const App = () => {
  return (
    <>
        <Router>
            <Header />
            <main className="my-3">
                <Container>
                    <Routes>
                        <Route path='/' element={<HomeScreen />} />
                        <Route path='/login' element={<LoginScreen />} />
                        <Route path='/profile' element={<ProfileScreen />} />
                        <Route path='/register' element={<RegisterScreen />} />
                        <Route path='/product/:id' element={<ProductScreen />} />
                        <Route path='/cart'>
                            <Route path=':id' element={<CartScreen />} />
                            <Route path='' element={<CartScreen />} />
                        </Route>
                    </Routes>
                </Container>
            </main>
        </Router>
        <Footer />
    </>
  )
}




export default App
