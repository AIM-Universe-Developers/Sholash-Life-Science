import React from 'react';
import './ProductCard.css';

const ProductCard = ({ name, description, category, color, price, rating, onAddToCart }) => {
    return (
        <div className="product-card fade-in">
            <div className="product-image-container" style={{ '--product-accent': color }}>
                <div className="product-placeholder">
                    <div className="product-silhouette"></div>
                </div>
                <div className="product-badge">{category}</div>
            </div>
            <div className="product-info">
                <div className="product-meta">
                    <div className="product-rating">
                        <span className="star">★</span>
                        <span className="rating-value">{rating}</span>
                    </div>
                    <div className="product-price">₹{price}</div>
                </div>
                <h3 className="product-name serif">{name}</h3>
                <p className="product-description">{description}</p>
                <div className="product-footer">
                    <button className="btn-cart" onClick={onAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
