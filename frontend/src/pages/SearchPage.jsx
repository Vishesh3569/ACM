import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';
import './SearchPage.css';


const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
  

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/search?query=${query}`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };
        
        if (query) fetchProducts();
    }, [query]);

    return (
        <div className="search-results-container">
        <h2 className="search-heading">Search Results for "{query}"</h2>
        <div className="product-grid">
            {products.map(product => (
                <Card key={product._id} product={product} />
            ))}
        </div>
    </div>
    );
};

export default SearchResults;
