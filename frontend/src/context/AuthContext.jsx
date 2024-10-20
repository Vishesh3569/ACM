import React, { useState, createContext, useContext } from 'react';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('authToken') ? true : false
  ); // Initialize with localStorage

  // Login function
  const login = (token) => {
    localStorage.setItem('authToken', token);  // Store the token
    setIsLoggedIn(true);  // Update state
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken'); // Remove the token
    setIsLoggedIn(false); // Update state
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
