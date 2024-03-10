// src/components/organisms/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa';
import ShoppingCart from './ShoppingCart';
import FilterMenu from '../molecules/FilterMenu'; // Import the new FilterMenu component
import { useSelector } from 'react-redux';

const HeaderContainer = styled.header`
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const CartIcon = styled.div`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Counter = styled.span`
  background-color: #ff5733;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  animation: pulse 0.6s infinite;
`;

const Header = () => {
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const cartItems = useSelector((state) => state.cart.items);
  const [cartCounter, setCartCounter] = useState(cartItems.length);

  const toggleCartModal = () => {
    setCartModalOpen(!isCartModalOpen);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <HeaderContainer>
      <Logo>My E-Commerce</Logo>
      <Navigation>
        <NavLink to="/">Home</NavLink>
        <FilterMenu selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        <CartIcon onClick={toggleCartModal}>
          <FaShoppingCart style={{ marginRight: '5px' }} />
          {cartCounter > 0 && <Counter key={cartCounter}>{cartCounter}</Counter>}
        </CartIcon>
        {isCartModalOpen && <ShoppingCart closeModal={toggleCartModal} />}
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
