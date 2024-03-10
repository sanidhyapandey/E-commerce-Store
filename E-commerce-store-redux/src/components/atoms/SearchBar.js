// src/components/atoms/SearchBar.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../slices/searchslice';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const SearchInput = styled.input`
  padding: 8px;
  margin-right: 10px;
  flex: 1; /* Use flex to make the input take up remaining space */
  border: 1px solid #f5f5f6;
  border-radius: 0 4px 4px 0;
  border-left: 0;
  background: #f5f5f6;
`;


const SearchIcon = styled(FaSearch)`
  margin-right: 5px;
  cursor: pointer;
`;

const SearchBar = () => {
  const [searchTermLocal, setSearchTermLocal] = useState('');
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    setSearchTermLocal(event.target.value);
  };

  const handleSearchSubmit = () => {
    dispatch(setSearchTerm(searchTermLocal));
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search products..."
        value={searchTermLocal}
        onChange={handleSearchChange}
      />
        <SearchIcon onClick={handleSearchSubmit} />
    </SearchContainer>
  );
};

export default SearchBar;
