import React from 'react';
import './BrandSection.css';

const BrandSection = () => {
    return (
        <section className="brand-section">
            <div className="container brand-grid">
                <div className="brand-visual">
                    <div className="image-stack">
                        <div className="main-image">
                            <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200" alt="Scientific Skincare" />
                        </div>
                        <div className="secondary-image floating-anim">
                            <img src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800" alt="Product Purity" />
                        </div>
                    </div>
                </div>

                <div className="brand-content">
                    <span className="brand-badge accent-font">Our Legacy & Science</span>
                    <h2 className="brand-title serif">The Pathway to <span className="text-gradient">Naturally Radiant</span> Skin</h2>
                    <p className="brand-desc">
                        At Sholash Life Sciences, our "Science of Glowing Skin" investigates the intricate biological processes 
                        that contribute to a naturally radiant complexion. We explore the synergy between nature 
                        and cutting-edge research for lasting beauty and confidence.
                    </p>

                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon science-icon"></div>
                            <div className="feature-text">
                                <h4 className="serif">Science-Based</h4>
                                <p>Biological research on moisture retention and skin elasticity.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon purity-icon"></div>
                            <div className="feature-text">
                                <h4 className="serif">Purity Ensured</h4>
                                <p>Protecting your skin with dermatologically tested formulas.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon result-icon"></div>
                            <div className="feature-text">
                                <h4 className="serif">Lasting Results</h4>
                                <p>Achieving long-term clarity and a natural glow from within.</p>
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
