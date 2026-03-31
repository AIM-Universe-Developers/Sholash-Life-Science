import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ id, name, description, category, color, image, hoverImage, price, rating, reviewsCount, onAddToCart, onBuyClick }) => {
    const navigate = useNavigate();
    const cardRef = useRef(null);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('show');
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const handleAddToCartClick = (e) => {
        e.stopPropagation(); // Prevent navigating to product detail page
        if (onAddToCart) {
            onAddToCart({ id, name, price, rating, reviewsCount, category, color, description, image });
        }
    };

    const handleBuyClick = (e) => {
        e.stopPropagation();
        if (onBuyClick) {
            onBuyClick({ id, name, price, rating, reviewsCount, category, color, description, image });
        }
    };

    return (
        <div className="product-card" ref={cardRef} onClick={() => navigate(`/product/${id}`)}>
            <div 
                className="product-image-container" 
                style={{ '--product-accent': color }}
                onMouseEnter={e => {
                    const img = e.currentTarget.querySelector('.product-image');
                    if (img && hoverImage) img.src = hoverImage;
                }}
                onMouseLeave={e => {
                    const img = e.currentTarget.querySelector('.product-image');
                    if (img) img.src = image;
                }}
            >
                <img src={image} alt={name} className="product-image" />
                <div className="product-badge">{category}</div>
            </div>
            <div className="product-info">
                <div className="product-meta">
                    <div className="product-price">₹{price}</div>
                    <div className="product-rating">
                        <span className="star">★</span>
                        <span className="rating-value">{rating}</span>
                        <span className="reviews-count">({reviewsCount})</span>
                    </div>
                </div>
                <h3 className="product-name serif">{name}</h3>
                <p className="product-description">{description}</p>
                <div className="product-footer">
                    <button className="btn-cart" onClick={handleBuyClick}>BUY</button>
                    <button className="btn-cart" onClick={handleAddToCartClick}>ADD CART</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
