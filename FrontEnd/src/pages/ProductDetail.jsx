import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductAccordion from '../components/ProductAccordion';
import ProductReviews from '../components/ProductReviews';
import './ProductDetail.css';

const ProductDetail = ({ onAddToCart, onBuyClick }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/api/products/${id}`);
                if (res.data.success) {
                    setProduct(res.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch product', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const getImageUrl = (img) => {
        if (!img) return '';
        if (img.startsWith('http')) return img;
        return `/${img}`;
    };

    if (loading) {
        return (
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <p>Loading product...</p>
            </div>
        );
    }

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

    const categoryName = typeof product.category === 'object' ? product.category?.name : product.category;
    const mainImage = product.images?.[0] ? getImageUrl(product.images[0]) : '';

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
    };

    return (
        <div className="product-detail-page">
            <div className="container">
                <div className="breadcrumb">
                    <span onClick={() => navigate('/')}>Home</span> /
                    <span onClick={() => navigate('/')}> {categoryName}</span> /
                    <span className="active"> {product.name}</span>
                </div>

                <div className="detail-container">
                    <div className="detail-visual fade-in">
                        <div className="detail-image-wrapper glass" style={{ '--product-accent': product.color }}>
                            <img src={mainImage} alt={product.name} className="detail-image" />
                        </div>
                    </div>

                    <div className="detail-info fade-in">
                        <span className="detail-category">{categoryName}</span>
                        <h1 className="serif">{product.name}</h1>
                        <h2 className='tag'>{product.tagline}</h2>
                        

                        <div className="detail-meta">
                            <div className="detail-price">MRP: ₹{product.price}</div>
                            <div className="detail-rating">
                                <span className="star">★</span>
                                <span className="rating-val">{product.rating}</span>
                                <span className="rev-count">({product.numReviews} verified reviews)</span>
                            </div>
                        </div>

                        <p className="detail-desc">{product.description}</p>
                        {product.target && product.target.length > 0 && (
                            <h3 className='target'>{product.target.join(', ')}</h3>
                        )}
                        {product.features && product.features.length > 0 && (
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
                        )}

                        <div className="purchase-controls">
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1 )}>+</button>
                            </div>
                            <button className="btn-add-large" onClick={handleAddToCart}>
                                Add to Cart
                            </button>

                            <button className="btn-add-large" onClick={() => onBuyClick && onBuyClick(product)}>
                                BUY
                            </button>
                        </div>

                        <div className="detail-trust-badges">
                            <div className="badge-item">
                                <span>Dermatologist Tested</span>
                            </div>
                            <div className="badge-item">
                                <span>100% Ingredients</span>
                            </div>
                            <div className="badge-item">
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

