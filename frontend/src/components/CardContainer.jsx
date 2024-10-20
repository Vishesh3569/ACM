import React from 'react';
import Card from './Card'; // Adjust the path based on your folder structure
import './CardContainer.css'; // Import CSS for CardContainer
import { useState,useEffect } from 'react';
import axios from 'axios';

const CardContainer = () => {

    const [products, setProducts] = useState([]); // State to store products
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to handle errors
  
    // useEffect to fetch products when the component loads
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/products');
          setProducts(response.data); // Set the products state with the data from the response
          setLoading(false); // Set loading to false once the data is fetched
        } catch (err) {
          console.error(err);
          setError('Failed to load products');
  
          setLoading(false);
          
        }
      };
  
      fetchProducts(); // Fetch products on component mount
    }, []); // Empty array ensures the useEffect runs only once on component mount
  
    if (loading) {
      return <div>Loading...</div>; // Show a loading message while data is being fetched
    }
  
    if (error) {
      return <div>{error}</div>; // Show an error message if there's an error
    }
    
    return (
        <div className="card-container">
            {products.slice(0,3).map((product) => (
                <Card key={product.id} product={product} />
            ))}
        </div>
    );
};

export default CardContainer;
