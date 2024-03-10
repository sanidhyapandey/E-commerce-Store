// src/components/organisms/ShoppingCart.js
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, selectCartItems,updateCartItemQuantity } from '../../slices/cartslice';
import Button from '../atoms/Button';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const CartModal = styled.div`
  position:relative;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 40%;
  h2 {
    color: black;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: black;
  font-size: 30px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const CartItem = styled.div`
background: #fff;
font-size: 14px;
border: 1px solid #eaeaec;
border-radius: 4px;
position: relative;
padding: 12px 12px 0;
display: flex;
gap: 25px;
margin-bottom: 15px;
p{
  color: #111111;
  font-weight: 700;
}
span {
  color: #94969f;
}
`
const CartItemClose = styled.button`
background: none;
border: none;
font-size: 20px;
cursor: pointer;
position: absolute;
top: 10px;
right: 10px;
color: black;
`
const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  span {
    margin: 0 5px;
  }
  p {
    margin-right: 5px;
  }
`;

const QuantityButton = styled.button`
  background-color: #ff3e6c;;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;

const ShoppingCart = ({ closeModal }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  const handleModalClose = () => {
    closeModal();
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
  };

 console.log(cartItems, 'cartItems')
  return (
    <ModalOverlay>
      <CartModal>
        <CloseButton onClick={handleModalClose}>&times;</CloseButton>
        <h2>Your Cart</h2>
        {cartItems.map((item) => (
          
          <CartItem key={item.id}>
            <div>
            <img src={item.image} width={100} height={100}></img>
            </div>
            <div>
            <p style={{color: 'black'}}>Title: {item.title}</p>
            <p>Price: ${item.price}</p>
            <span>Rating: {item.rating.rate}</span> <span>({item.rating.count})</span>
            <QuantityControl>
              <p>Quantity:  </p>
              <QuantityButton onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                -
              </QuantityButton>
              <span>{item.quantity}</span>
              <QuantityButton onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                +
              </QuantityButton>
            </QuantityControl>
            </div>
            
            <CartItemClose onClick={() => handleRemoveFromCart(item.id)}>&times;</CartItemClose>
          </CartItem>
        ))}
        <Button onClick={handleClearCart}>Clear Cart</Button>
      </CartModal>
    </ModalOverlay>
  );
};

export default ShoppingCart;
