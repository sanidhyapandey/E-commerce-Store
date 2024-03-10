// src/components/organisms/ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../api';
import { addToCart } from '../../slices/cartslice';
import Button from '../atoms/Button';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px;
  display: flex;
  gap: 40px;
`;

const Image = styled.img`
  max-height: 500px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  color: #111111;
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin: 30px 0;
  padding-top: 20px;
  border-top: 1px solid #e9e9ed;
`;


const ImageContainer = styled.div`
flex-basis: 70%;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;

`

const Rating = styled.span`
font-size: 16px;
margin-bottom: 5px;
color: #94969f;
`
const ContentContainer = styled.div`
border-top: 1px solid #e9e9ed;

`

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const products = await fetchProducts();
        const selectedProduct = products.find((p) => p.id === parseInt(productId, 10));

        if (selectedProduct) {
          setProduct(selectedProduct);
        } else {
          console.error('Product not found!');
        }
      } catch (error) {
        console.error('Error fetching product details:', error.message);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { id, title, price, description, image,rating, category } = product;
  console.log(product, 'product')

  const handleAddToCart = (event) => {
    event.preventDefault();
    dispatch(addToCart(product));
  };



  return (
    <Container>
      <ImageContainer>
      <Image src={image} alt={title} />
      </ImageContainer>
      <ContentContainer>
      <Title>{title}</Title>
      <Rating>{category}</Rating>
          <Price>Price: ${price.toFixed(2)}</Price>
          <Rating>Rating: {rating.rate} <span>({rating.count})</span></Rating>
      <Description>Description: {description}</Description>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
      </ContentContainer>
    </Container>
  );
};

export default ProductDetails;
