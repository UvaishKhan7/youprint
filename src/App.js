import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MobileNavbar from './components/mobileNavbar/MobileNavbar';
import HeaderUpper from './components/header/headerUpper/HeaderUpper';
import HeaderLower from './components/header/headerLower/HeaderLower';
import LandingPage from './pages/landingPage/LandingPage';
import SearchResults from './pages/searchResults/SearchResults';
import Footer from './components/footer/footer';
import CustomProductPage from './pages/customProductPage/CustomProductPage';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';

export default function App() {
  return (
    <div className='App'>
      <header>
        <HeaderUpper />
        <HeaderLower />
      </header>
      <MobileNavbar />
      <div className="pages-container">
        <Routes>
          <Route path='/' Component={LandingPage} />
          <Route path='/product/:id' Component={CustomProductPage} />
          <Route path='/search/:searchTerm' Component={SearchResults} />
          <Route path='/cart' Component={Cart} />
          <Route path='/checkout' Component={Checkout} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
