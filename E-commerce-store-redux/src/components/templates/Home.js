// src/components/templates/Home.js
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProductList from '../organisms/ProductList';
import ProductDetails from '../organisms/ProductDetails';
import ShoppingCart from '../organisms/ShoppingCart';
// import productsData from '../../data/products';
import Header from '../organisms/Header';
import HeroBanner from '../molecules/HeroBanner';
import ProductsNew from '../organisms/ProductsNew';


const Home = () => {
  const location = useLocation();
  return (
    <div>
      {/* <Link to="/cart">Go to Cart</Link> {/* Add a link to navigate to the cart */}
      <Header /> 
      {location.pathname === '/' && <HeroBanner />}
      {location.pathname === '/'&& <ProductsNew/>}
      <Routes>
        <Route path="/product/:productId" element={<ProductDetails  />} />
        <Route path="/cart/*" element={<ShoppingCart />} />
        <Route path="/products" element={<ProductList  />} />
      </Routes>
    </div>
  );
};

export default Home;
