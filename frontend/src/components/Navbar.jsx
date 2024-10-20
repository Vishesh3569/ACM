import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { isLoggedIn, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false); // State to manage mobile menu

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Toggle the menu open/close
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="brand-name">ElevateKicks</Link>
            </div>

            {/* Hamburger Menu Icon for Mobile */}
            <div className="menu-icon" onClick={toggleMenu}>
                <div className={menuOpen ? 'bar open' : 'bar'}></div>
                <div className={menuOpen ? 'bar open' : 'bar'}></div>
                <div className={menuOpen ? 'bar open' : 'bar'}></div>
            </div>

            {/* Navbar links */}
            <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                <Link to="/" className="nav-item">Home</Link>
                <Link to="/products" className="nav-item">Products</Link>
                {isLoggedIn ? (
                    <Link to='/' className='nav-item' onClick={logout}>Logout</Link>
                ) : (
                    <Link to="/login" className='nav-item'>Login</Link>
                )}
                <Link to="/cart" className="nav-item">Cart</Link>

                {/* <form className="search-form" onSubmit={handleSearch}>
        <input 
          type="text" 
           
          className="search-input" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        /form>*/}
                <Link to="/seller" className="nav-item seller-btn">Become a Seller</Link>
            </div>
        </nav>
    );
};

export default Navbar;

      
