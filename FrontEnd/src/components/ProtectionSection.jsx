import React from 'react';
import './ProtectionSection.css';

const protectionCategories = [
    {
        id: 1,
        title: "Emulsion Creams",
        description: "Semi-solid mixtures of oil & water (O/W or W/O), used for topical drug delivery or skin hydration.",
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 2h10l2 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6l2-4z" />
                <path d="M12 11v8M9 15h6" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Medicated Creams",
        description: "Contain active drugs (e.g., steroids, antibiotics) to treat skin conditions like eczema, infections, or inflammation.",
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 21h4M12 17v4M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                <path d="M12 7v4M10 9h4" />
            </svg>
        )
    },
    {
        id: 3,
        title: "Protective Creams",
        description: "Barrier creams (e.g., zinc oxide) that shield skin from moisture, irritants, or diaper rash.",
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="5" width="14" height="14" rx="2" />
                <path d="M9 12h6M12 9v6" />
            </svg>
        )
    },
    {
        id: 4,
        title: "Cosmetic Creams",
        description: "Non-medicated (e.g., moisturizers) for hydration, anti-aging, or improving skin texture without therapeutic effects.",
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                <path d="M7.5 10.5c.5-1 1.5-1.5 2.5-1.5s2 .5 2.5 1.5" />
                <path d="M13.5 10.5c.5-1 1.5-1.5 2.5-1.5s2 .5 2.5 1.5" />
                <path d="M9 16c1.5 1.5 4.5 1.5 6 0" />
            </svg>
        )
    }
];

const ProtectionSection = () => {
    return (
        <section className="protection-section">
            <div className="container protection-container">
                <div className="protection-visual fade-in">
                    <div className="protection-image-wrapper">
                        <img
                            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800"
                            alt="Diverse Healthy Skin"
                            className="protection-image"
                        />
                        <div className="protection-blob"></div>
                        <div className="protection-blob secondary"></div>
                    </div>
                </div>

                <div className="protection-content fade-in">
                    <h2 className="serif">Oil skin protection</h2>
                    <p className="protection-description">
                        Oil skin protection creates a barrier that locks in moisture, prevents
                        dryness, and shields against environmental damage, maintaining
                        healthy skin.
                    </p>

                    <div className="protection-grid">
                        {protectionCategories.map(item => (
                            <div key={item.id} className="protection-item">
                                <div className="protection-icon">
                                    {item.icon}
                                </div>
                                <div className="protection-text">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProtectionSection;
