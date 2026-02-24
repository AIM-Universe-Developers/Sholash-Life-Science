import React from 'react';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <HeroCarousel />
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
