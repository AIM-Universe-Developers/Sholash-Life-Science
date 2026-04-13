import React from 'react';
import './BrandSection.css';
import mainImage from '../assets/new images/main image.png';
import secondaryImage from '../assets/new images/secondary image.png';

const BrandSection = () => {
    return (
        <section className="brand-section">
            <div className="container brand-grid">
                <div className="brand-visual">
                    <div className="image-stack">
                        <div className="main-image">
                            <img src={mainImage} alt="Scientific Skincare" />
                        </div>
                        <div className="secondary-image floating-anim">
                            <img src={secondaryImage} alt="Product Purity" />
                        </div>
                    </div>
                </div>

                <div className="brand-content">
                    <span className="brand-badge accent-font">Our Legacy & Science</span>
                    <h2 className="brand-title serif">Science-Backed <span className="text-gradient">Skincare For</span>Real Results</h2>
                    <p className="brand-desc">
                        At Sholash Life Sciences, we combine advanced dermatological research with carefully selected ingredients to create skincare that delivers visible, lasting results.
                        Engineered to restore balance, enhance clarity, and support your skin’s  strength.
                    </p>

                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon science-icon"></div>
                            <div className="feature-text">
                                <h4 className="serif">Science-Driven Care</h4>
                                <p>Formulated with clinically studied ingredients to improve hydration, texture, and skin resilience.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon purity-icon"></div>
                            <div className="feature-text">
                                <h4 className="serif">Dermatologist-Tested Safety</h4>
                                <p>Protecting your skin with dermatologically tested formulas.Gentle, effective, and suitable for sensitive and acne-prone skin.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon result-icon"></div>
                            <div className="feature-text">
                                <h4 className="serif">Lasting Results</h4>
                                <p>Designed to deliver real improvements in skin clarity, smoothness, and overall health.</p>
                            </div>
                        </div>
                    </div>

                    <div className="brand-actions">
                        <button className="btn-primary" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
                            Explore Products
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandSection;
