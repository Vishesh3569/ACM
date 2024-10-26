
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import ProductPage from './pages/Product';
import ProductDetails from './pages/ProductDetail';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import CheckoutPage from './pages/Checkout';
import Payment from './pages/Payment';
import Seller from './pages/Seller';
import SearchResults from './pages/SearchPage';



function App() {
  
  return (
    <AuthProvider>
    <CartProvider>
    <Router>
      <div className="app-container">
      <Navbar></Navbar>
      <div className="main-content">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path='/payment' element={<Payment />}/>
        <Route path='/seller' element={<Seller />} />
        <Route path='/search' element={<SearchResults />} />
      </Routes>
      </div>
      <Footer></Footer>
      </div>
     
      
      
    </Router>
    </CartProvider>
   </AuthProvider>
  );
}

export default App;
