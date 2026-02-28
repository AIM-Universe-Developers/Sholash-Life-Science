import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './ProductList.css';

const ProductList = ({ searchQuery = '', onAddToCart, onBuyClick }) => {
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section id="products" className="product-section">
            <div className="container">
                <div className="section-header fade-in">
                    <marquee>Ceramoiz || Glazzium || Uvinor || Acnevor CN || Acnevor || SertaFree</marquee>
                    <span className="subtitle">Curated Care</span>
                    <h2 className="serif">Our Signature Collection</h2>
                    <p className="section-description">
                        Discover our range of dermatologist-tested solutions tailored for your unique skin needs.
                    </p>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="product-grid">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                {...product}
                                onAddToCart={onAddToCart}
                                onBuyClick={onBuyClick}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-results fade-in" style={{ textAlign: 'center', padding: '4rem 0', opacity: 0.6 }}>
                        <h3 className="serif">No products found</h3>
                        <p>We couldn't find any products matching "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductList;
