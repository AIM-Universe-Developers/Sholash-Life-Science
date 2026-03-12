import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import './OurProducts.css';

const OurProducts = ({ searchQuery = '' }) => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);

    useEffect(() => {
        const cards = sectionRef.current?.querySelectorAll('.our-product-card');
        if (!cards) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 100}ms`;
            observer.observe(card);
        });

        return () => observer.disconnect();
    }, [searchQuery]);

    // Filtering logic based on search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // If search is empty, show the core products (original 3x2+1 grid look)
    // Otherwise show all matching products
    const displayProducts = searchQuery.trim() === ''
        ? products.filter(p => [1, 2, 3, 4, 5, 6, 7].includes(p.id))
        : filteredProducts;

    return (
        <section id="products" className="products-section our-products-section" ref={sectionRef}>
            <div className="container">
                <marquee>Calgro™ || Ceramois™ || Glazzium™ || Uvinor™ || Acnevor CN™ || Acnevor™ || SertaFree™</marquee>
                <h2 className="our-products-title serif">
                    {searchQuery.trim() === '' ? 'Our Product' : 'Search Results'}
                </h2>

                {displayProducts.length > 0 ? (
                    <div className="our-products-grid">
                        {displayProducts.map(product => (
                            <div
                                key={product.id}
                                className="our-product-card"
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                <div className="our-product-image-container">
                                    <img src={product.image} alt={product.name} className="our-product-image" />
                                </div>
                                <h3 className="our-product-name">{product.name.split('-')[0]}</h3>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-results" style={{ textAlign: 'center', padding: '3rem 0', opacity: 0.7 }}>
                        <h3 className="serif">No products found for "{searchQuery}"</h3>
                        <p>Try searching for a different product or category.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default OurProducts;
