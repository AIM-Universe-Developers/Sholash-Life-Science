import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductAccordion from '../components/ProductAccordion';
import ProductReviews from '../components/ProductReviews';
import './ProductDetail.css';

const ProductDetail = ({ onAddToCart, onBuyClick }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h2>Product Not Found</h2>
                <button onClick={() => navigate('/')} className="btn-primary" style={{ marginTop: '20px' }}>
                    Back to Collection
                </button>
            </div>
        );
    }

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
    };

    return (
        <div className="product-detail-page">
            <div className="container">
                <div className="breadcrumb">
                    <span onClick={() => navigate('/')}>Home</span> /
                    <span onClick={() => navigate('/')}> {product.category}</span> /
                    <span className="active"> {product.name}</span>
                </div>

                <div className="detail-container">
                    <div className="detail-visual fade-in">
                        <div className="detail-image-wrapper glass" style={{ '--product-accent': product.color }}>
                            <img src={product.image} alt={product.name} className="detail-image" />
                        </div>
                    </div>

                    <div className="detail-info fade-in">
                        <span className="detail-category">{product.category}</span>
                        <h1 className="serif">{product.name}</h1>
                        <h2 className='tag'>{product.tagline}</h2>

                        <div className="detail-meta">
                            <div className="detail-price">₹{product.price}</div>
                            <div className="detail-rating">
                                <span className="star">★</span>
                                <span className="rating-val">{product.rating}</span>
                                <span className="rev-count">({product.reviewsCount} verified reviews)</span>
                            </div>
                        </div>

                        <p className="detail-desc">{product.description}</p>

                        <div className="detail-features">
                            <h3>Key Benefits:</h3>
                            <ul>
                                {product.features.map((feature, index) => (
                                    <li key={index}>
                                        <span className="check">✓</span> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="purchase-controls">
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(q => Math.max(0, q - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)}>+</button>
                            </div>
                            <button className="btn-add-large" onClick={handleAddToCart}>
                                Add to Cart{product.quantity}
                            </button>

                            <button className="btn-add-large" onClick={() => onBuyClick && onBuyClick(product)}>
                                BUY
                            </button>
                        </div>

                        <div className="detail-trust-badges">
                            <div className="badge-item">
                                <span className="badge-icon">🛡️</span>
                                <span>Dermatologist Tested</span>
                            </div>
                            <div className="badge-item">
                                <span className="badge-icon">🌿</span>
                                <span>Natural Ingredients</span>
                            </div>
                            <div className="badge-item">
                                <span className="badge-icon">🐇</span>
                                <span>Cruelty Free</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ProductAccordion product={product} />
            <ProductReviews />
        </div>
    );
};

export default ProductDetail;
