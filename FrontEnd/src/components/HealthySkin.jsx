import React from 'react';
import './HealthySkin.css';

const features = [
    {
        id: 1,
        title: "Hydration",
        description: "Maintains moisture balance, preventing dryness, flakiness, and irritation for smooth, supple skin.",
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Nutrition",
        description: "Supports skin repair, elasticity, and glow with essential vitamins and minerals.",
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
            </svg>
        )
    },
    {
        id: 3,
        title: "Protection",
        description: "Shields against UV rays, pollution, and harmful environmental factors, maintaining skin health.",
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        )
    },
    {
        id: 4,
        title: "Exfoliation",
        description: "Removes dead cells, promoting cell turnover for a fresh, radiant complexion.",
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
        )
    }
];

const HealthySkin = () => {
    return (
        <section className="healthy-skin-section">
            <div className="container healthy-skin-container">
                <div className="healthy-skin-content fade-in">
                    <h2 className="serif">Healthy skin</h2>
                    <p className="main-description">
                        Healthy skin is well-hydrated, smooth, evenly toned, resilient, free from
                        irritation or blemishes, and has a natural, radiant glow.
                    </p>

                    <div className="features-grid">
                        {features.map(feature => (
                            <div key={feature.id} className="feature-item">
                                <div className="feature-icon">
                                    {feature.icon}
                                </div>
                                <div className="feature-text">
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="healthy-skin-visual fade-in">
                    <div className="trendy-image-wrapper">
                        <img
                            src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800"
                            alt="Healthy Radiant Skin"
                            className="healthy-skin-image"
                        />
                        <div className="color-blob"></div>
                        <div className="color-blob secondary"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HealthySkin;
