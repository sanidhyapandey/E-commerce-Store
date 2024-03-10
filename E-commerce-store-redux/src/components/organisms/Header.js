// src/components/organisms/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa';
import ShoppingCart from './ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessage } from '../../slices/cartslice';
import { setSearchTerm, selectSearchTerm } from '../../slices/searchslice';
import SearchBar from '../atoms/SearchBar';

const HeaderContainer = styled.header`
  padding: 20px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white !important;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,.05);
  // position: fixed;
  // top:0;
  // width: 100%;
  a {
    color: #282c3f;
    font-weight: 700;
  }
  @media (min-width: 375px) and (max-width: 600px) {
    padding: 10px 20px;
  }
  `;

const Logo = styled.div`
  height: 50px;
  width: 50px;
  background: url('../../../logo.png') center/cover no-repeat;
  @media (min-width: 375px) and (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #111111;
  text-decoration: none;
  margin-right: 20px;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const CartIcon = styled.div`
  color: #111111;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  position: relative; /* Make position relative for absolute positioning of the message */

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
  top: -10px;
  right: -17px;
`;

const Message = styled.span`
  background-color: #90EE90;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  position: absolute;
  top: 100%;
  right: 0;
`;

const NavLinksContainer = styled.div `
margin-left: 150px;
@media (min-width: 375px) and (max-width: 600px) {
  display: none;
}
`


const Header = () => {
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartMessage = useSelector((state) => state.cart.message);
  const [cartCounter, setCartCounter] = useState(cartItems.length);
  const dispatch = useDispatch();

  const searchTerm = useSelector(selectSearchTerm);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    dispatch(setSearchTerm(term));
  };


  const handleHomeClick = () => {
    dispatch(setSearchTerm('')); // Reset the search term when going back to home
  };

  useEffect(() => {
    setCartCounter(cartItems.length);

    if (cartMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [cartItems, cartMessage, dispatch]);

  const toggleCartModal = () => {
    setCartModalOpen(!isCartModalOpen);
  };

  return (
    <HeaderContainer>
      <NavLink onClick={handleHomeClick} to="/"><Logo></Logo></NavLink>
      <NavLinksContainer>
      <NavLink >Men</NavLink>
      <NavLink >Women</NavLink>
      <NavLink>Jewelery</NavLink>
      <NavLink to="/products">Products</NavLink>
      </NavLinksContainer>
      <Navigation>
        <SearchBar value={searchTerm} onChange={handleSearchChange}/>
        <NavLink onClick={handleHomeClick} to="/">Login</NavLink>
        <CartIcon onClick={toggleCartModal}>
          <FaShoppingCart style={{ marginRight: '5px' }} />
          {cartCounter > 0 && <Counter key={cartCounter}>{cartCounter}</Counter>}
          {cartMessage && <Message>{cartMessage}</Message>}
        </CartIcon>
        {isCartModalOpen && <ShoppingCart closeModal={toggleCartModal} />}
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
