import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products'; // ✅ adjust path if needed
import ProductAccordion from '../components/ProductAccordion';
import ProductReviews from '../components/ProductReviews';
import './ProductDetail.css';

const ProductDetail = ({ onAddToCart, onBuyClick }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);

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
    // ✅ Get product from static data
    const product = products.find(p => String(p.id) === String(id));

    // ✅ Dynamic rating state
    const [dynamicRating, setDynamicRating] = useState(0);
    const [dynamicReviewsCount, setDynamicReviewsCount] = useState(0);

    // ✅ Load reviews from localStorage
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
                setDynamicReviewsCount(product.reviewsCount || 0);
            }
        }
    }, [id, product]);

    // ✅ Hover image logic
    const [currentImage, setCurrentImage] = useState(product?.image || '');

    // ✅ Product not found
>>>>>>> 22b016bb42fcf4c3c69067396a8f6e86945f3085
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
                                // onMouseEnter={() => setCurrentImage(product.hoverImage || product.image)}
                                onMouseLeave={() => setCurrentImage(product.image)}
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="detail-info fade-in">
<<<<<<< HEAD
                        <span className="detail-category">{categoryName}</span>
                        <h1 className="serif">{product.name}</h1>
                        <h2 className='tag'>{product.tagline}</h2>
                        
=======

                        <span className="detail-category">{product.category}</span>

                        <h1 className="product-title">{product.name}</h1>
                        <p className="tag">{product.tagline}</p>
>>>>>>> 22b016bb42fcf4c3c69067396a8f6e86945f3085

                        <div className="detail-meta">
                            <div className="detail-price">MRP: ₹{product.price}</div>

                            <div className="detail-rating">
                                <span className="star">★</span>
<<<<<<< HEAD
                                <span className="rating-val">{product.rating}</span>
                                <span className="rev-count">({product.numReviews} verified reviews)</span>
=======
                                <span>{dynamicRating}</span>
                                <span> ({dynamicReviewsCount} reviews)</span>
>>>>>>> 22b016bb42fcf4c3c69067396a8f6e86945f3085
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

                        {/* Features */}
                        <div className="detail-features">
                            <h3>Key Benefits:</h3>
                            <ul>
                                {product.features?.map((feature, index) => (
                                    <li key={index}>✓ {feature}</li>
                                ))}
                            </ul>
                        </div>
>>>>>>> 22b016bb42fcf4c3c69067396a8f6e86945f3085

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