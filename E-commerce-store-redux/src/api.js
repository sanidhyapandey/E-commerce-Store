// src/api.js
const apiUrl = 'https://fakestoreapi.com/products';

const fetchProducts = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw error;
  }
};

export { fetchProducts };
