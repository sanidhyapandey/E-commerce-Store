// src/components/organisms/ProductList.js
import React, { useEffect, useState } from 'react';
import ProductCard from '../molecules/ProductCard';
import { fetchProducts } from '../../api';
import styled from 'styled-components';
import Heading from '../atoms/Heading';

const ProductsListContainer = styled.div`
  margin: 30px;
 // background-color: #f4f4f4;
  h2 {
    text-transform: uppercase;
    color: #3e4152;
    font-weight: 700;
    text-align: center;
  }
`;

const ProductGrid = styled.div`
 display: flex;
 justify-content: space-around;
 gap:20px;
`;




const ProductsNew = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <ProductsListContainer>
        <Heading>TRENDING NOW</Heading>
      <ProductGrid>
        {products.slice(0,3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
      <Heading>New Arrivals</Heading>
      <ProductGrid>
        {products.slice(8,11).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </ProductsListContainer>
  );
};

export default ProductsNew;
