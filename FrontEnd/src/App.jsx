import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import ProductList from './components/ProductList';
import SkinTypes from './components/SkinTypes';
import HealthySkin from './components/HealthySkin';
import ProtectionSection from './components/ProtectionSection';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import PaymentProcess from './pages/PaymentProcess';
import OurProducts from './components/OurProducts';
import WhatsAppButton from './components/WhatsAppButton';
import AuthModal from './components/AuthModal';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authProduct, setAuthProduct] = useState(null);

  const handleBuyClick = (product) => {
    setAuthProduct(product);
    setIsAuthOpen(true);
  };

  const handleAddToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    console.log(`Added ${quantity} of ${product.name} to cart.`);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <TopBar />
        <Header
          cartCount={cart.length}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAuthClick={() => setIsAuthOpen(true)}
        />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <div id="home">
                  <HeroCarousel />
                </div>
                <OurProducts />
                {/* <div id="products">
                  <ProductList
                    onAddToCart={handleAddToCart}
                    searchQuery={searchQuery}
                    onBuyClick={handleBuyClick}
                  />
                </div> */}
                <div id="skin-types">
                  <SkinTypes />
                </div>
                <div id="about">
                  <HealthySkin />
                </div>
                <div id="protection">
                  <ProtectionSection />
                </div>
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={
              <Cart
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveFromCart={handleRemoveFromCart}
              />
            } />
            <Route path="/payment" element={<PaymentProcess cart={cart} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} onBuyClick={handleBuyClick} />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          product={authProduct}
        />
      </div>
    </Router>
  );
}

export default App;
