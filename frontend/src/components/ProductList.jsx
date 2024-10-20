import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Available Products</h1>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
