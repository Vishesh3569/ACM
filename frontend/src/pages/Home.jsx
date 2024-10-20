import React from 'react';
import './pages.css';
import Card from '../components/Card';
import HomeCard from '../components/HomeCard';
import CardContainer from '../components/CardContainer';
const Home=()=>{
  
    const HomeProducts =[
        {
            title: 'ShowStopper',
           
            imageUrl: 'https://img.freepik.com/free-photo/close-up-futuristic-sneakers_23-2151005649.jpg?t=st=1728727398~exp=1728730998~hmac=42d2258b98e29767caf230b636ec6c12b056b27e895a8f15c76593c78de1c86e&w=1380'
        },
        {
            title: 'Omega-9',
            
            imageUrl: 'https://img.freepik.com/free-photo/pastel-colors-3d-sneakers_23-2151853216.jpg?t=st=1728727581~exp=1728731181~hmac=3b6c69b7dd8a7668cd9a2d27a30caae1f30024828b06748ea97468da00f927ab&w=826',
            
        },
        {
            title: "High-Top",
           
            imageUrl: "https://img.freepik.com/free-photo/close-up-futuristic-sneakers_23-2151005731.jpg?t=st=1728727654~exp=1728731254~hmac=6938e0fe3d957c4197708c0d2ff3af43739e33b4759fc7923e173dccf4828543&w=1380",
            
        },
    ];
    return(
       <div className="big-div">
        <div className='Banner'>
            <img className='Banner-image' src='/Images/shoe1.jpg' alt='Shoe image'/>
            <a href="/products" class="banner-link">
    <span class="banner-text">Watch the future... </span></a>
        </div>

        <div className="Trending">
            <h3>Just IN</h3>
            <h1>ZERO</h1>
            <p className="paragraph-text">Greatness happens when you're focused on your flight path. This newest
                colorway 'Zero Days Off' speaks to Jayson's Love of the grind and is here to help you elevate your game
            </p>
            <button className="Trending-button">Shop Now</button>

        </div>
        <div className="Card-Container">
            <div className="Heading">Featured</div>
        {HomeProducts.map((product, index) => (
                <HomeCard 
                    key={index}
                    title={product.title}
                    
                    imageUrl={product.imageUrl}
                    
                />
            ))}
        </div>
        
        <div className="Card-Container">
            <div className="Heading">See Whats new</div>
            <CardContainer />

        
        </div>
        
       </div>
    )
}
export default Home;