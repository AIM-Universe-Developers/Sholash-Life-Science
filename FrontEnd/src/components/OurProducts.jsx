<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
=======
import React, { useEffect, useRef, useState } from 'react';
>>>>>>> 21895ce55f9dff65f2a636e5ad64009615c7274c
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OurProducts.css';

const OurProducts = ({ searchQuery = '' }) => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
<<<<<<< HEAD
    const [hoveredProductId, setHoveredProductId] = useState(null);

=======
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const params = {};
                if (searchQuery.trim()) params.search = searchQuery;
                const res = await axios.get('/api/products', { params });
                if (res.data.success) {
                    setProducts(res.data.data || []);
                }
            } catch (err) {
                console.error('Failed to fetch products', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [searchQuery]);
>>>>>>> 21895ce55f9dff65f2a636e5ad64009615c7274c

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
    }, [products]);

    const getImageUrl = (product) => {
        if (product.images && product.images.length > 0) {
            const img = product.images[0];
            if (img.startsWith('http')) return img;
            return `/${img}`;
        }
        return '';
    };

    if (loading) {
        return (
            <section id="products" className="products-section our-products-section">
                <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <p>Loading products...</p>
                </div>
            </section>
        );
    }

    return (
        <section id="products" className="products-section our-products-section" ref={sectionRef}>
            <div className="container">
                <marquee>
                    {products.map(p => p.name.split('–')[0].trim()).join(' || ')}
                </marquee>
                <h2 className="our-products-title serif">
                    {searchQuery.trim() === '' ? 'Our Product' : 'Search Results'}
                </h2>

                {products.length > 0 ? (
                    <div className="our-products-grid">
                        {products.map(product => (
                            <div
                                key={product._id}
                                className="our-product-card"
<<<<<<< HEAD
                                onClick={() => navigate(`/product/${product.id}`)}
                                onMouseEnter={() => setHoveredProductId(product.id)}
                                onMouseLeave={() => setHoveredProductId(null)}
                            >
                                <div className="our-product-image-container">
                                    <img 
                                        src={hoveredProductId === product.id && product.hoverImage ? product.hoverImage : product.image} 
                                        alt={product.name} 
                                        className="our-product-image" 
                                    />
=======
                                onClick={() => navigate(`/product/${product._id}`)}
                            >
                                <div className="our-product-image-container">
                                    <img src={getImageUrl(product)} alt={product.name} className="our-product-image" />
>>>>>>> 21895ce55f9dff65f2a636e5ad64009615c7274c
                                </div>
                                <h3 className="our-product-name">{product.name.split('–')[0]}</h3>
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

