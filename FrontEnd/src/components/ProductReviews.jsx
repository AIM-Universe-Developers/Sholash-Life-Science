import React, { useState } from 'react';
import './ProductReviews.css';

const ProductReviews = () => {
    const [activeTab, setActiveTab] = useState('reviews');
    const [sortBy, setSortBy] = useState('Highest Rating');
    const [isSortOpen, setIsSortOpen] = useState(false);
    
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

    const [allReviews, setAllReviews] = useState([
        {
            id: 1,
            user: "Nyra",
            verified: true,
            location: "🇮🇳",
            rating: 5,
            title: "Aloe Vera gel",
            content: "Loving it. My skin is so soft and soothing.",
            date: "2 days ago"
        },
        {
            id: 2,
            user: "Anonymous",
            verified: true,
            location: "🇬🇧",
            rating: 5,
            title: "Good",
            content: "Good",
            date: "1 week ago"
        },
        {
            id: 3,
            user: "esadurai",
            verified: true,
            location: "🇮🇳",
            rating: 5,
            title: "wonderful product",
            content: "act as a compliment and as always it is just awesome as the other products that I have been using so far",
            date: "3 weeks ago"
        },
        {
            id: 4,
            user: "Rahul S.",
            verified: true,
            location: "🇮🇳",
            rating: 4,
            title: "Great results",
            content: "I've been using this for a month and can see a visible difference. Highly recommend for daily use.",
            date: "1 month ago"
        },
        {
            id: 5,
            user: "Sarah M.",
            verified: true,
            location: "🇺🇸",
            rating: 1,
            title: "Not for me",
            content: "It didn't work well with my skin type. Had some redness.",
            date: "2 months ago"
        },
        {
            id: 6,
            user: "Priya K.",
            verified: true,
            location: "🇮🇳",
            rating: 5,
            title: "Must buy!",
            content: "The best product in this range. Worth every penny.",
            date: "2 months ago"
        }
    ]);

    // Filter reviews: "under 1 star hide the review" 
    const filteredReviews = allReviews.filter(review => review.rating > 1);

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
        setUserRating(rating);
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
            date: "Just now"
        };

        setAllReviews([newReview, ...allReviews]);
        setIsFormOpen(false);
        setUserRating(0);
        setReviewForm({ name: '', title: '', content: '' });
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
                        <button className="btn-review-action fill" onClick={() => setIsFormOpen(!isFormOpen)}>
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

                <div className="reviews-media-section">
                    <div className="media-left">
                        <h3 className="media-title">Customer photos & videos</h3>
                        <div className="media-grid">
                            {customerPhotos.map((url, i) => (
                                <div key={i} className="media-item">
                                    <img src={url} alt={`Customer ${i}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="media-right">
                        <div className="transparency-badge">
                            <div className="badge-ring">
                                <div className="badge-inner">
                                    <svg viewBox="0 0 100 100" className="badge-svg">
                                        <path id="curve" d="M 25, 50 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0" fill="transparent" />
                                        <text className="badge-text" fontSize="10">
                                            <textPath xlinkHref="#curve">SILVER TRANSPARENCY • </textPath>
                                        </text>
                                    </svg>
                                    <div className="badge-score">92.3</div>
                                    <div className="badge-check">✔</div>
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
