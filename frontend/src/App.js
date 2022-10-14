import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CarttScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ListUsersScreen from './screens/ListUsersScreen';
import UserEditScreen from './screens/UserEditScreen';
import ListProductsScreen from './screens/ListProductsScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ListOrdersScreen from './screens/ListOrdersScreen';

const App = () => {
  return (
    <>
        <Router>
            <Header />
            <main>
                <Routes>                        
                    <Route path='/' element={<HomeScreen />} />
                    <Route path='/login' element={<LoginScreen />} />
                    <Route path='/profile' element={<ProfileScreen />} />
                    <Route path='/register' element={<RegisterScreen />} />
                    <Route path='/product/:id' element={<ProductScreen />} />
                    <Route path='/shipping' element={<ShippingScreen />} />
                    <Route path='/payment' element={<PaymentScreen />} />
                    <Route path='/placeorder' element={<PlaceOrderScreen />} />
                    <Route path='/order'>
                        <Route path=':id' element={<OrderScreen />} />
                    </Route>
                    <Route path='/cart'>
                        <Route path=':id' element={<CartScreen />} />
                        <Route path='' element={<CartScreen />} />
                    </Route>
                    <Route path='/admin/userlist' element={<ListUsersScreen />} />
                    <Route path='/admin/user'>
                        <Route path=':id/edit' element={<UserEditScreen />} />
                    </Route>
                    <Route path='/admin/productlist'>
                        <Route path='page/:pagenumber' element={<ListProductsScreen />} />
                        <Route path='' element={<ListProductsScreen />} />
                    </Route>
                    <Route path='/admin/product'>
                        <Route path=':id/edit' element={<ProductEditScreen />} />
                    </Route>
                    <Route path='/admin/orderlist' element={<ListOrdersScreen />} />
                    <Route path='/search'>
                        <Route path=':searchword' element={<HomeScreen />} />
                        <Route path=':searchword/page/pagenumber' element={<HomeScreen />} />
                    </Route>
                    <Route path='/page'>
                        <Route path=':pagenumber' element={<HomeScreen />} />
                    </Route>
                </Routes>
            </main>
        </Router>
        <Footer />
    </>
  )
}




export default App
