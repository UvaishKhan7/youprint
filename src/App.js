import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MobileNavbar from './components/mobileNavbar/MobileNavbar';
import HeaderUpper from './components/header/headerUpper/HeaderUpper';
import HeaderLower from './components/header/headerLower/HeaderLower';
//import LandingPage from './pages/landingPage/LandingPage';
import SearchResults from './pages/searchResults/SearchResults';
import Footer from './components/footer/footer';
import ProductPage from './pages/productPage/ProductPage';

export default function App() {
  return (
    <div className='App'>
      <header>
        <HeaderUpper />
        <HeaderLower />
      </header>
      <MobileNavbar />
      <Routes>
        <Route path='/' Component={ProductPage} />
        <Route path='/search' Component={SearchResults} />
      </Routes>
      <Footer />
    </div>
  )
}
