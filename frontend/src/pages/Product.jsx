import React, {useEffect,useState } from 'react';
import './Product.css';
import Card from '../components/Card';
import axios from 'axios';
 // Import your ProductCard component

const ProductPage = () => {
    

  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
  const [filteredProducts,setFilteredProducts]=useState([]);
  const [selectedcategory,setSelectedCategory]=useState('');

  // useEffect to fetch products when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        
        setProducts(response.data); // Set the products state with the data from the response
        setFilteredProducts(response.data);
        setLoading(false); // Set loading to false once the data is fetched
      } catch (err) {
        console.error(err);
        setError('Failed to load products');

        setLoading(false);
        
      }
    };

    fetchProducts(); // Fetch products on component mount
  }, []);// Empty array ensures the useEffect runs only once on component mount



  if (loading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Show an error message if there's an error
  }
  const handleClick=(category)=>{
    setSelectedCategory(category);
    if(category==="All"){
      setFilteredProducts(products);
      
    }
    else{
    
    const filtered=products.filter((product)=> category===product.category);
    
    setFilteredProducts(filtered);
    }
  }
  return (
    <div className="product-page">
      {/* Left Sidebar for Categories */}
      <div className="category-section" >
        <h2>Categories</h2>
        <ul>
          <li onClick={()=> handleClick('All')}>All Products</li>
          <li onClick={()=> handleClick('HighTop')}>High Top</li>
          <li onClick={()=> handleClick('LowTop')}>Low Top</li>
          <li onClick={()=> handleClick('Sneakers')}>Sneakers</li>
          <li onClick={()=> handleClick('Boots')}>Boots</li>
        </ul>
      </div>

      {/* Right Side for Product Cards */}
      <div className='products'>
      {filteredProducts.map((product) => (
        <Card key={product._id} product={product} /> // Render the ProductCard for each product
      ))}
      </div>
    </div>
  );
};

export default ProductPage;
