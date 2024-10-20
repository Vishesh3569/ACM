import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext"; // Assuming you have CartContext setup
import "./CheckoutPage.css";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems} = useContext(CartContext); 
  // Fetch cart items and total price from context
  const navigate=useNavigate();



  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // You can send formData to backend here
    alert("Proceeding to Payment!");
  };
  const handleClick = ()=>{
    navigate("/payment");
  }

  const totalAmount=cartItems.reduce((total, item) => total + item.price*item.quantity, 0);

  return (
    <div className="checkout-container">
      {/* Form Section */}
      <div className="checkout-form">
        <h2>Shipping Details</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            required
          />
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            placeholder="Zip Code"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <button type="submit" className="checkout-btn" onClick={handleClick}>
            Proceed to Payment
          </button>
        </form>
      </div>

      {/* Cart Summary Section */}
      <div className="checkout-cart-summary">
        <h2>Cart Summary</h2>
        {cartItems.length > 0 ? (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div className="cart-item">
                    <span>{item.name} </span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <strong>Total:</strong>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
