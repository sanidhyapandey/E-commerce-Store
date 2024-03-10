// src/components/organisms/ProductList.js
import React, { useEffect, useState } from 'react';
import ProductCard from '../molecules/ProductCard';
import { fetchProducts } from '../../api';
import styled from 'styled-components';
import { selectSearchTerm } from '../../slices/searchslice';
import { useDispatch, useSelector } from 'react-redux';
import Heading from '../atoms/Heading';
import Button from '../atoms/Button';

const ProductsListContainer = styled.div`
  margin: 30px;
  //background-color: #f4f4f4;
  display: flex;
  flex-direction: row;
  @media (min-width: 375px) and (max-width: 600px) {
    flex-direction: column;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;

  @media (min-width: 375px) and (max-width: 600px) {
    display: flex;
    flex-direction: column;

  }

  // @media (max-width: 1200px) {
  //   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  // }

  // @media (max-width: 768px) {
  //   grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  // }
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FilterLabel = styled.label`
  margin-right: 20px;
  padding-bottom: 10px;
`;

const SearchInput = styled.input`
  padding: 8px;
  margin-right: 10px;
`;

const ClearButton = styled.button`
  margin-left: 10px;
`;

const FiltersWrapper = styled.div`
 text-align: left;
 width: 15%;
 padding-top: 20px;
    padding-bottom: 15px;
    padding-left: 25px;
    border-bottom: 1px solid #e9e9ed;
    position: relative;
    border-right: 1px solid #edebef;
    @media (min-width: 375px) and (max-width: 600px) {
      width: 100%;
    }
`
const ProductGridContainer = styled.div`
 width: 80%;
 padding-left:20px;
`

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };


  const filteredProducts = products
  .filter((product) =>
    selectedCategory ? product.category === selectedCategory : true
  )
  .filter((product) =>
    searchTerm ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );


  const clearFilters = () => {
    setSelectedCategory(null);
  };

  return (
    <>
    <Heading>Products</Heading>
    <ProductsListContainer>
      
      <FiltersWrapper>
      <h2>Choose filters</h2>
      <FilterContainer>
        <FilterLabel>
          <input
            type="radio"
            name="category"
            value="men's clothing"
            checked={selectedCategory === "men's clothing"}
            onChange={() => handleCategoryChange("men's clothing")}
          />
          Men's Clothing</FilterLabel>
          <FilterLabel>
          <input
            type="radio"
            name="category"
            value="women's clothing"
            checked={selectedCategory === "women's clothing"}
            onChange={() => handleCategoryChange("women's clothing")}
          />
          Women's Clothing</FilterLabel>
          <FilterLabel>
          <input
            type="radio"
            name="category"
            value="jewelery"
            checked={selectedCategory === "jewelery"}
            onChange={() => handleCategoryChange("jewelery")}
          />
          Jewelery</FilterLabel>
          <FilterLabel>
          <input
            type="radio"
            name="category"
            value="electronics"
            checked={selectedCategory === "electronics"}
            onChange={() => handleCategoryChange("electronics")}
          />
          Electronics
        </FilterLabel>
      </FilterContainer>
      <Button onClick={clearFilters}>Clear Filters</Button>
      </FiltersWrapper>
      
      <ProductGridContainer>
      <ProductGrid>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
      </ProductGridContainer>
    </ProductsListContainer>
    </>
  );
};

export default ProductList;
