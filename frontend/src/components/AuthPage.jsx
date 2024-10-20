import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import axios from 'axios';  // You can use fetch or axios for making API requests
import './toggleButton.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const Navigate=useNavigate();
    const { login } = useAuth();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    // This function will handle the login logic
    const handleLogin = async (credentials) => {
        try {
            // Make an API call to your backend for login
            const response = await axios.post('http://localhost:8000/api/users/login', credentials);
            
            // Assuming the response contains a token
            const { data } = response;
            
            // Store the token in localStorage (or use cookies)
            localStorage.setItem('authToken', data.token);
            login(data.token);
            
            console.log('Login successful! Token:', data.token);
            Navigate('/products');

            // Redirect user or update UI after login

        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
        }
    };

    // This function will handle the signup logic (optional)
    const handleSignup = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:8000/api/users/register', credentials);
            const { data } = response;
            
            console.log('Signup successful! Data:', data);
            // Handle signup success, maybe login the user or show a message
            Navigate('/products');

        } catch (error) {
            console.error('Signup failed:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="auth-page">
            {isLogin ? (
                <Login onLogin={handleLogin} />
            ) : (
                <Signup onSignup={handleSignup} />
            )}
            <button onClick={toggleForm} className="toggle-button">
                {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default AuthPage;
