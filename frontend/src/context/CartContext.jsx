import React, { createContext, useState, useEffect } from 'react';

// Create CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  

  // Load cart items from localStorage when the app initializes
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  // Save cart items to localStorage when cartItems state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  

  useEffect(() => {
    // Calculate total price when cartItems changes
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
   
  };

  const removeFromCart = (productName) => {
    
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== productName));
  };

  return (
    <CartContext.Provider value={{ cartItems,totalPrice,addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
