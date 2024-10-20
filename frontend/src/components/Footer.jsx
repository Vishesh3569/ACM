import React from 'react';
import './Footer.css'; // Import your CSS for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 YourBrandName</p>
                <div className="footer-links">
                    <a href="/privacy-policy">Privacy Policy</a>
                    <span>|</span>
                    <a href="/terms-of-use">Terms of Use</a>
                </div>
                <p className="footer-address">123 Your Street, Your City, Your Country</p>
            </div>
        </footer>
    );
};

export default Footer;
