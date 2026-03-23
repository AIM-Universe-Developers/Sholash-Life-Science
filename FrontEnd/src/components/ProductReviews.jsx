import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import './ProductReviews.css';

const ProductReviews = () => {
    const [activeTab, setActiveTab] = useState('reviews');
    const [sortBy, setSortBy] = useState('Highest Rating');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { id: productId } = useParams();
    const imageStorageKey = `sholash_uploaded_image_${productId}`;
    const [userBeforeImage, setUserBeforeImage] = useState(() => {
        return localStorage.getItem(imageStorageKey) || null;
    });
    const { user } = useContext(UserContext);
    
    // Manual Review States

    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        name: '',
        title: '',
        content: ''
    });

    const sortOptions = [
        'Most Recent',
        'Highest Rating',
        'Lowest Rating',
        'Only Pictures',
        'Pictures First',
        'Videos First',
        'Most Helpful'
    ];
    const customerPhotos = [
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop'
    ];

    const storageKey = `sholash_reviews_${productId}`;

    const [allReviews, setAllReviews] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [];
    });

    // Save reviews whenever they change
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(allReviews));
    }, [allReviews, storageKey]);


    // Show all reviews including 1 star
    const filteredReviews = allReviews;

    // Dynamic calculations
    const totalReviews = filteredReviews.length;
    const averageRating = totalReviews > 0 
        ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(2) 
        : "0.00";

    const starDistribution = [5, 4, 3, 2, 1].map(star => {
        const count = filteredReviews.filter(r => r.rating === star).length;
        const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
        return { stars: star, count, percent };
    });

    const handleStarClick = (rating) => {
        if (!user) {
            alert("Please sign in to rate this product!");
            return;
        }
        setUserRating(rating);
    };

    const toggleForm = () => {
        if (!user) {
            alert("Please sign in to write a review!");
            return;
        }
        setIsFormOpen(!isFormOpen);
        if (!isFormOpen && user) {
            setReviewForm(prev => ({ ...prev, name: user.name || user.username || '' }));
        }
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!userRating) {
            alert("Please select a rating first!");
            return;
        }

        const newReview = {
            id: allReviews.length + 1,
            user: reviewForm.name || "Guest User",
            verified: false,
            location: "🇮🇳",
            rating: userRating,
            title: reviewForm.title || "Customer Review",
            content: reviewForm.content,
            date: new Date().toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            })
        };

        setAllReviews([newReview, ...allReviews]);
        setIsFormOpen(false);
        setUserRating(0);
        setReviewForm({ name: '', title: '', content: '' });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setUserBeforeImage(base64String);
                try {
                    localStorage.setItem(imageStorageKey, base64String);
                } catch (error) {
                    console.error("Error saving image:", error);
                    alert("Image is too large to save! Try a smaller image.");
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section className="product-reviews-section">
            <div className="container">
                <h2 className="reviews-main-title serif">Real People Real Stories</h2>

                <div className="reviews-summary-card glass">
                    <div className="summary-left">
                        <div className="rating-big">
                            <div className="stars">★★★★★</div>
                            <div className="rating-text">
                                <span className="score">{averageRating}</span> out of 5
                            </div>
                            <div className="based-on">Based on {totalReviews} reviews</div>
                        </div>
                    </div>

                    <div className="summary-middle">
                        {starDistribution.map((row, i) => (
                            <div key={i} className="rating-bar-row">
                                <div className="row-stars">{'★'.repeat(row.stars)}{'☆'.repeat(5 - row.stars)}</div>
                                <div className="bar-container">
                                    <div className="bar-fill" style={{ width: `${row.percent}%` }}></div>
                                </div>
                                <div className="row-count">{row.count}</div>
                            </div>
                        ))}
                    </div>

                    <div className="summary-right">
                        <button className="btn-review-action fill" onClick={toggleForm}>
                            {isFormOpen ? 'Close Form' : 'Write a review'}
                        </button>
                    </div>
                </div>

                <div className="rate-product-bar glass">
                    <span className="rate-text">Rate this product</span>
                    <div className="interactive-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star-item ${star <= (hoverRating || userRating) ? 'active' : ''}`}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => handleStarClick(star)}
                            >
                                {star <= (hoverRating || userRating) ? '★' : '☆'}
                            </span>
                        ))}
                    </div>
                </div>

                {isFormOpen && (
                    <div className="review-form-container glass fade-in">
                        <h3 className="form-title">Write your review</h3>
                        <form onSubmit={handleReviewSubmit}>
                            <div className="form-group row">
                                <div className="input-field">
                                    <label>Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Your name" 
                                        value={reviewForm.name}
                                        onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="input-field">
                                    <label>Review Title</label>
                                    <input 
                                        type="text" 
                                        placeholder="Give your review a title" 
                                        value={reviewForm.title}
                                        onChange={(e) => setReviewForm({...reviewForm, title: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Review Content</label>
                                <textarea 
                                    placeholder="Write your comments here" 
                                    rows="4"
                                    value={reviewForm.content}
                                    onChange={(e) => setReviewForm({...reviewForm, content: e.target.value})}
                                    required
                                ></textarea>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn-submit-review">Submit Review</button>
                            </div>
                        </form>
                    </div>
                )}

                {selectedImage && (
                    <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
                        <div className="lightbox-box" onClick={e => e.stopPropagation()}>
                            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>✕</button>
                            <img src={selectedImage} alt="Full view" className="lightbox-img" />
                        </div>
                    </div>
                )}

                <div className="reviews-media-section">
                    <div className="media-left">
                        <h3 className="media-title">Customer photos &amp; videos</h3>
                        <div className="media-grid">
                            {customerPhotos.map((url, i) => (
                                <div key={i} className="media-item" onClick={() => setSelectedImage(url)}>
                                    {/* <img src={url} alt={`Customer ${i}`} /> */}
                                </div>
                            ))}
                            {userBeforeImage && (
                                <div className="media-item user-upload-item" onClick={() => setSelectedImage(userBeforeImage)}>
                                    <img src={userBeforeImage} alt="My Photo" />
                                    <span className="upload-label">My Photo</span>
                                </div>
                            )}
                            {user && (
                                <label className="upload-btn" title="Add your photo">
                                    <input type="file" accept="image/*" style={{display:'none'}} onChange={handleImageUpload} />
                                    <span>＋</span><span className="upload-btn-text">Add Photo</span>
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="media-right">
                        <div className="transparency-badge">
                            <div className="badge-ring">
                                <div className="badge-inner">
                                    {/* <svg viewBox="0 0 100 100" className="badge-svg">
                                        <path id="curve" d="M 25, 50 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0" fill="transparent" />
                                        <text className="badge-text" fontSize="10">
                                            <textPath xlinkHref="#curve">SILVER TRANSPARENCY • </textPath>
                                        </text>
                                    </svg> */}
                                    {/* <div className="badge-score">92.3</div>
                                    <div className="badge-check">✔</div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="reviews-list-container">
                    <div className="list-header">
                        <div className="tabs">
                            <button
                                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Reviews ({totalReviews})
                            </button>
                            {/* <button
                                className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
                                onClick={() => setActiveTab('questions')}
                            >
                                Questions (78)
                            </button> */}
                        </div>

                        <div className="search-sort-row">
                            <div className="review-search">
                                <input type="text" placeholder="Search" />
                                <span className="search-icon">🔍</span>
                            </div>

                            <div className="review-sort">
                                <button className="sort-trigger" onClick={() => setIsSortOpen(!isSortOpen)}>
                                    {sortBy} <span className={`arrow ${isSortOpen ? 'up' : 'down'}`}>⌄</span>
                                </button>
                                {isSortOpen && (
                                    <div className="sort-dropdown shadow-lg">
                                        {sortOptions.map(option => (
                                            <div
                                                key={option}
                                                className={`sort-option ${sortBy === option ? 'selected' : ''}`}
                                                onClick={() => {
                                                    setSortBy(option);
                                                    setIsSortOpen(false);
                                                }}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="reviews-grid">
                        {filteredReviews.map(review => (
                            <div key={review.id} className={`review-card glass ${review.rating >= 4 ? 'positive-highlight' : ''}`}>
                                <div className="review-card-header">
                                    <div className="user-info">
                                        <div className="user-avatar">{review.user[0]}</div>
                                        <div className="user-details">
                                            <div className="user-name-row">
                                                <span className="user-name">{review.user}</span>
                                                {review.verified && <span className="verified-badge">Verified</span>}
                                            </div>
                                            <div className="user-loc">{review.location}</div>
                                        </div>
                                    </div>
                                    <div className="review-date">{review.date}</div>
                                </div>
                                <div className="review-rating">
                                    {'★'.repeat(review.rating)}
                                </div>
                                <h4 className="review-title">{review.title}</h4>
                                <p className="review-content">{review.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductReviews;
