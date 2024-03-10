// src/components/molecules/HeroBanner.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';

const HeroContainer = styled.div`
  background: url('../../../heroImg.png') center/cover no-repeat; /* Replace with the path to your image */
  color: #fff;
  text-align: left;
  padding: 100px 60px;
  height: 50vh;
  a {
    text-decoration: none;
    color: white;
    font-weight:700;
  }
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  font-weight: 700;
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  margin-bottom: 40px;
`;

const HeroBanner = () => {
  return (
    <HeroContainer>
      <HeroTitle>Welcome to our E-Commerce Store</HeroTitle>
      <HeroSubtitle>Discover a wide range of products for every need.</HeroSubtitle>
      <Button><Link to ="/products">EXPLORE</Link></Button>
      
    </HeroContainer>
  );
};

export default HeroBanner;
