import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { products as staticProducts } from '../data/products'; // ✅ adjust path if needed
import ProductAccordion from '../components/ProductAccordion';
import ProductReviews from '../components/ProductReviews';
import './ProductDetail.css';

const ProductDetail = ({ onAddToCart, onBuyClick }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Dynamic rating state
    const [dynamicRating, setDynamicRating] = useState(0);
    const [dynamicReviewsCount, setDynamicReviewsCount] = useState(0);
    const [currentImage, setCurrentImage] = useState('');

    const getImageUrl = (img) => {
        if (!img) return '';
        if (img.startsWith('http')) return img;
        if (img.startsWith('/')) return img;
        return `/${img}`;
    };

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                // First, check static data
                const staticProd = staticProducts.find(p => String(p.id) === String(id));
                if (staticProd) {
                    setProduct(staticProd);
                    setCurrentImage(staticProd.image || '');
                    setLoading(false);
                    return;
                }

                // If not found statically, fetch from API
                const res = await axios.get(`/api/products/${id}`);
                if (res.data && res.data.success) {
                    setProduct(res.data.data);
                    // Use first image array element or fallback
                    setCurrentImage(getImageUrl(res.data.data.images?.[0] || res.data.data.image));
                } else {
                    setProduct(null);
                }
            } catch (err) {
                console.error('Failed to fetch product', err);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // ✅ Load reviews from localStorage whenever product is set
    useEffect(() => {
        if (id && product) {
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
                    setDynamicRating(product.rating || 0);
                    setDynamicReviewsCount(0);
                }
            } else {
                setDynamicRating(product.rating || 0);
                setDynamicReviewsCount(product.reviewsCount || product.numReviews || 0);
            }
        }
    }, [id, product]);

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

    const categoryName = typeof product.category === 'object'
        ? product.category?.name
        : product.category;

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
    };

    return (
        <div className="product-detail-page">
            <div className="container">

                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <span onClick={() => navigate('/')}>Home</span> /
                    <span onClick={() => navigate('/')}> {categoryName}</span> /
                    <span className="active"> {product.name}</span>
                </div>

                <div className="detail-container">

                    {/* Image */}
                    <div className="detail-visual fade-in">
                        <div className="detail-image-wrapper glass">
                            <img
                                src={currentImage}
                                alt={product.name}
                                className="detail-image"
                                onMouseLeave={() => setCurrentImage(getImageUrl(product.images?.[0] || product.image))}
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="detail-info fade-in">
                        <span className="detail-category">{categoryName}</span>
                        <h1 className="product-title">{product.name}</h1>
                        <h2 className='tag'>{product.tagline}</h2>

                        <div className="detail-meta">
                            <div className="detail-price">MRP: ₹{product.price}</div>

                            <div className="detail-rating">
                                <span className="star">★</span>
                                <span className="rating-val">{dynamicRating}</span>
                                <span className="rev-count">({dynamicReviewsCount} reviews)</span>
                            </div>
                        </div>

                        <p className="detail-desc">{product.description}</p>

                        {product.target && product.target.length > 0 && (
                            <h3 className='target'>{product.target.join(', ')}</h3>
                        )}

                        <div className="detail-features">
                            <h3>Key Benefits:</h3>
                            <ul>
                                {product.features?.map((feature, index) => (
                                    <li key={index}>
                                        <span className="check">✓</span> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quantity + Buttons */}
                        <div className="purchase-controls">
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)}>+</button>
                            </div>

                            <button className="btn-add-large" onClick={handleAddToCart}>
                                Add to Cart
                            </button>

                            <button className="btn-add-large" onClick={() => onBuyClick && onBuyClick(product)}>
                                BUY
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Extra Sections */}
            <ProductAccordion product={product} />
            <ProductReviews />
        </div>
    );
};

export default ProductDetail;
