import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';


const ProductDetails = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('authToken');  
    
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`http://localhost:8000/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const { addToCart } = useContext(CartContext); 
  

  

 


  const handleAddToCart = () => {
    if (!isLoggedIn) {
        alert('Please log in to add the product to your cart');
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }

      const productToAdd = {
        ...product,
        size: selectedSize,
        quantity: quantity,
      };
    addToCart(productToAdd); // Add product to the cart
    alert('Product added to the cart');
  };

  const descriptionSentences = product?.description?.split('.') || [];

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  // Handle quantity increment
  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Handle quantity decrement
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };


  return (
    <div className="product-detail-container">
      <div className="product-image-container">
        <img src={`http://localhost:8000/${product.image}`} alt={product.name} className="product-image" />
      </div>
      <div className="product-info-container">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-category">{product.category}</p>
        
        <h3 className="product-price">MRP : ₹{product.price}</h3>
        <p>Inclusive of all taxes</p>
        <p>(Also includes all applicable duties)</p>
        <br></br>
        <div className="product-description">
      {/* Map over the sentences and render each inside a <p> */}
      {descriptionSentences.map((sentence, index) => (
        sentence.trim() !== '' && <p key={index}>{sentence.trim()}.</p>
      ))}
    </div>

       

        <div className="product-rating">
          <span className="rating-stars">⭐⭐⭐⭐⭐</span>
          <span className="rating-count">({product.numReviews} reviews)</span>
        </div>

        <div className="quantity-container">
        <label>Quantity:</label>
        <button 
          className="quantity-btn" 
          onClick={handleDecrease} 
          disabled={quantity === 1}
        >
          -
        </button>
        <input 
          type="text" 
          className="quantity-input" 
          value={quantity} 
          readOnly
        />
        <button 
          className="quantity-btn" 
          onClick={handleIncrease}
        >
          +
        </button>
      </div>

      {/* Size Selector */}
      <div className="size-container">
        <label>Select Size:</label>
        {['8', '8.5', '9','9.5','10'].map(size => (
          <button
            key={size}
            className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
            onClick={() => handleSizeSelect(size)}
          >
            {size} 
          </button>
        ))}
      </div>

        <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
       
      </div>
    </div>
  );
};

export default ProductDetails;
