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
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
    console.log(`Added ${product.name} to cart.`);
  };

  return (
    <Router>
      <div className="app">
        <TopBar />
        <Header cartCount={cart.length} />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <div id="home">
                  <HeroCarousel />
                </div>
                <div id="products">
                  <ProductList onAddToCart={addToCart} />
                </div>
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
