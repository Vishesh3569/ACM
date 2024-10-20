import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Check if the user is logged in by checking for a token (or any auth method you're using)
  const isLoggedIn = !!localStorage.getItem('authToken');

  useEffect(() => {
    if (!isLoggedIn) {
      alert('Please log in to access your cart');
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
    } else {
      navigate('/checkout');
    }
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price*item.quantity, 0); // Calculate total price

  return (
    <div className="cart-container">
      <h1 className='Heading'>Shopping Cart</h1>

      {/* Display message if the cart is empty */}
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty!</h2>
          <p>Add products to your cart.</p>
        </div>
      ) : (
        <>
          {/* Table structure for Cart Items */}
          <table className="cart-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <span>{item.name}</span>
                  </td>
                  <td>{item.category}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td> {/* Replace this with a quantity handler later */}
                  <td>
                    <button onClick={() => removeFromCart(item.name)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Price and Proceed Button */}
          <div className="cart-summary">
            <h2>Total Price: ₹{totalAmount.toFixed(2)}</h2>
            <button className="proceed-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
