import React from 'react';
import './HomeCard.css'; // Import your CSS for styling
import { useNavigate } from 'react-router-dom';


const HomeCard = ({ title, imageUrl }) => {
    const navigate=useNavigate();

    const handleClick = ()=>{
        navigate('/products');
    }
    return (
        <div className="card">
            <img src={imageUrl} alt={title} className="Homecard-image" />
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <button onClick={handleClick} className="shop-now-button">Shop Now</button>
            </div>
        </div>
    );
};

export default HomeCard;
