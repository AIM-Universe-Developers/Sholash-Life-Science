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
<<<<<<< HEAD
    const [isHovered, setIsHovered] = useState(false);

=======
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
>>>>>>> 21895ce55f9dff65f2a636e5ad64009615c7274c

<<<<<<< HEAD
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
=======
    const product = products.find(p => p.id === parseInt(id));
    const [dynamicRating, setDynamicRating] = useState(product ? product.rating : 0);
    const [dynamicReviewsCount, setDynamicReviewsCount] = useState(product ? product.reviewsCount : 0);

    useEffect(() => {
        if (id) {
            const storageKey = `sholash_reviews_${id}`;
            const savedReviews = localStorage.getItem(storageKey);
            if (savedReviews) {
                const reviews = JSON.parse(savedReviews);
                if (reviews.length > 0) {
                    const total = reviews.length;
                    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / total;
                    setDynamicRating(avg.toFixed(1));
                    setDynamicReviewsCount(total);
                } else {
                    setDynamicRating(product.rating);
                    setDynamicReviewsCount(0);
                }
            }
        }
    }, [id, product]);

>>>>>>> f7515cb76e04c86d32b18121b7271ab7629f3004

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
<<<<<<< HEAD
                        <div 
                            className="detail-image-wrapper glass" 
                            style={{ '--product-accent': product.color }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <img 
                                src={isHovered && product.hoverImage ? product.hoverImage : product.image} 
                                alt={product.name} 
                                className="detail-image" 
                            />
=======
                        <div className="detail-image-wrapper glass" style={{ '--product-accent': product.color }}>
                            <img src={mainImage} alt={product.name} className="detail-image" />
>>>>>>> 21895ce55f9dff65f2a636e5ad64009615c7274c
                        </div>
                    </div>

                    <div className="detail-info fade-in">
<<<<<<< HEAD
                        <span className="detail-category">{categoryName}</span>
                        <h1 className="serif">{product.name}</h1>
                        <h2 className='tag'>{product.tagline}</h2>
=======
                        <div className="category-tag-wrapper">
                            <span className="detail-category">{product.category}</span>
                        </div>
                        <h1 className="product-title">{product.name}</h1>
                        <p className="tag">{product.tagline}</p>
>>>>>>> f7515cb76e04c86d32b18121b7271ab7629f3004
                        

                        <div className="detail-meta">
                            <div className="detail-price">MRP: ₹{product.price}</div>
                            <div className="detail-rating">
                                <span className="star">★</span>
<<<<<<< HEAD
                                <span className="rating-val">{product.rating}</span>
                                <span className="rev-count">({product.numReviews} verified reviews)</span>
=======
                                <span className="rating-val">{dynamicRating}</span>
                                <span className="rev-count">({dynamicReviewsCount} verified reviews)</span>
>>>>>>> f7515cb76e04c86d32b18121b7271ab7629f3004
                            </div>
                        </div>

                        <p className="detail-desc">{product.description}</p>
<<<<<<< HEAD
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
=======
                        <div className="additional-info-container">
                            {product.Target && (
                                <div className="info-row">
                                    <span className="info-label">Target:</span>
                                    <span className="info-value">{product.Target}</span>
                                </div>
                            )}
                            {product.tar && (
                                <div className="info-row">
                                    <span className="info-label">Composition:</span>
                                    <span className="info-value">{product.tar}</span>
                                </div>
                            )}
                            {product.futch && (
                                <div className="info-row">
                                    <span className="info-label">Features:</span>
                                    <span className="info-value">{product.futch}</span>
                                </div>
                            )}
                            {product.precautions && (
                                <div className="info-row precautions-row">
                                    <span className="info-label">Note:</span>
                                    <span className="info-value">{product.precautions}</span>
                                </div>
                            )}
                        </div>
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
>>>>>>> f7515cb76e04c86d32b18121b7271ab7629f3004

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

