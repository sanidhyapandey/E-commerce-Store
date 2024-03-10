// src/components/molecules/ProductCard.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    margin: 10px 0;
  }
  width: 350px;
`;



const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 150px;
    object-fit: contain;
  }
`;

const Content = styled.div`
  padding: 15px;
  margin-bottom: 25px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
  color: #111111;
  font-weight: 700;
`;
const CardImageContainer = styled.div`
  width:350px;
  height: 400px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
  @media (min-width: 375px) and (max-width: 600px) {
    width: 100%;
    height: 100%;
  }
`;
const Rating = styled.span`
font-size: 16px;
margin-bottom: 5px;
color: #94969f;
`


const ProductCard = ({ product }) => {
  const { id, title, price, image, rating } = product;

  return (
    <Link style={{textDecoration: 'none', color: '#111111'}} to={`/product/${id}`}>
      <CardImageContainer>
        <Image src={image} alt={title} />
      </CardImageContainer>
        <Card>
        <Content>
          <Title>{title}</Title>
          <Price>Price: ${price.toFixed(2)}</Price>
          <Rating>Rating: {rating.rate} <span>({rating.count})</span></Rating>
        </Content>
      </Card>
    </Link>
  );
};

export default ProductCard;
