import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ProductAccordion from '../components/ProductAccordion';
import ProductReviews from '../components/ProductReviews';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [showStickyBuy, setShowStickyBuy] = useState(false);
    const purchaseRef = React.useRef(null);

    useEffect(() => {
        if (!purchaseRef.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Show sticky buy if the main purchase controls scroll out of the top of the viewport
                if (window.innerWidth <= 768) {
                    setShowStickyBuy(!entry.isIntersecting && entry.boundingClientRect.top < 0);
                } else {
                    setShowStickyBuy(false);
                }
            },
            { threshold: 0 }
        );

        observer.observe(purchaseRef.current);
        return () => observer.disconnect();
    }, [product]);

    const getImageUrl = (img) => {
        if (!img) return '';
        if (img.startsWith('http')) return img;
        const BASE = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000';
        return img.startsWith('/') ? `${BASE}${img}` : `${BASE}/${img}`;
    };

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/api/products/${id}`);
                if (res.data && res.data.success) {
                    const apiProd = res.data.data;
                    const baseImages = Array.isArray(apiProd.images) && apiProd.images.length ? apiProd.images : (apiProd.image ? [apiProd.image] : []);
                    const normalized = baseImages.map(getImageUrl).filter(Boolean);
                    setProduct(apiProd);
                    setCurrentImage(normalized[0] || '');
                    setCurrentImageIndex(0);
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

    const galleryImages = product
        ? (Array.isArray(product.images) && product.images.length ? product.images : [product.image]).map(getImageUrl).filter(Boolean)
        : [];

    const selectedImage = galleryImages[currentImageIndex] || galleryImages[0] || currentImage;

    const handleThumbnailClick = (index) => {
        if (!galleryImages.length) return;
        const nextImage = galleryImages[index] || galleryImages[0];
        setCurrentImageIndex(index);
        setCurrentImage(nextImage);
    };

    const showPrevImage = () => {
        if (!galleryImages.length) return;
        const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        setCurrentImageIndex(prevIndex);
        setCurrentImage(galleryImages[prevIndex]);
    };

    const showNextImage = () => {
        if (!galleryImages.length) return;
        const nextIndex = (currentImageIndex + 1) % galleryImages.length;
        setCurrentImageIndex(nextIndex);
        setCurrentImage(galleryImages[nextIndex]);
    };

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
                        <div className="detail-gallery">
                            <div className="thumbnail-column">
                                {galleryImages.map((img, idx) => (
                                    <button
                                        key={`${product.id}-thumb-${idx}`}
                                        className={`thumbnail-btn ${currentImageIndex === idx ? 'active' : ''}`}
                                        onClick={() => handleThumbnailClick(idx)}
                                    >
                                        <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} />
                                    </button>
                                ))}
                            </div>

                            <div className="detail-image-wrapper glass">
                                <img
                                    src={selectedImage}
                                    alt={product.name}
                                    className="detail-hero-image zoom-hover"
                                />

                                {galleryImages.length > 1 && (
                                    <>
                                        <button className="nav-arrow left" onClick={showPrevImage}>
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button className="nav-arrow right" onClick={showNextImage}>
                                            <ChevronRight size={20} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mobile Swipe Gallery */}
                        <div className="mobile-swipe-gallery">
                            <div className="swipe-track">
                                {galleryImages.map((img, idx) => (
                                    <div className="swipe-slide" key={idx}>
                                        <img src={img} alt={`${product.name} ${idx + 1}`} />
                                    </div>
                                ))}
                            </div>
                            {galleryImages.length > 1 && (
                                <div className="swipe-dots">
                                    {galleryImages.map((_, idx) => (
                                        <div key={idx} className={`swipe-dot ${idx === 0 ? 'active' : ''}`}></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="detail-info fade-in">
                        <span className="detail-category">{categoryName}</span>
                        <h1 className="product-title">{product.name}</h1>
                        <h2 className='tag'>{product.tagline}</h2>

                        <div className="promo-text">
                            <h3>Fights Acne & Acne Marks</h3>
                            <p>Clinically powered formula for brighter, smooth, and blemish-free skin.</p>
                        </div>

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
                        <div className="purchase-controls" ref={purchaseRef}>
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

            {/* Mobile Sticky Buy Bar */}
            <div className={`mobile-sticky-buy ${showStickyBuy ? 'visible' : ''}`}>
                <div className="sticky-price-info">
                    <span className="sc-name">{product.name}</span>
                    <span className="sc-price">₹{product.price}</span>
                </div>
                <button className="btn-add-large" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
