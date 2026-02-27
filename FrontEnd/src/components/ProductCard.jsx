import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ id, name, description, category, color, price, rating, reviewsCount, onAddToCart }) => {
    const navigate = useNavigate();

    const handleAddToCartClick = (e) => {
        e.stopPropagation(); // Prevent navigating to product detail page
        if (onAddToCart) {
            onAddToCart({ id, name, price, rating, reviewsCount, category, color, description });
        }
    };

    return (
        <div className="product-card fade-in" onClick={() => navigate(`/product/${id}`)}>
            <div className="product-image-container" style={{ '--product-accent': color }}>
                <div className="product-placeholder">
                    <div className="product-silhouette"></div>
                </div>
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
                    <button className="btn-cart">BUY</button>
                    <button className="btn-cart" onClick={handleAddToCartClick}>ADD CART</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
