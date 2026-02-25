import React from 'react';
import './SkinTypes.css';

const skinTypes = [
    {
        id: 1,
        title: "Normal Skin",
        description: "Normal skin is well-balanced, neither too oily nor too dry, with a smooth texture, minimal blemishes, and healthy elasticity.",
        icon: (
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L4.5 9c0 0 1.5 1.5 3 0s3.5-3.5 4.5-5c1 1.5 3 3.5 4.5 5s3-0 3-0L12 2z" />
                <path d="M12 2v20" />
                <path d="M12 7c-1.5 2-4.5 4-4.5 4s1 2.5 3 1.5" />
                <path d="M12 7c1.5 2 4.5 4 4.5 4s-1 2.5-3 1.5" />
                <path d="M12 13c-1.5 2-4 4-4 4s1 3 3.5 2" />
                <path d="M12 13c1.5 2 4 4 4 4s-1 3-3.5 2" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Oily Skin",
        description: "Oily skin produces excess sebum, leading to a shiny appearance, enlarged pores, and a higher risk of acne breakouts.",
        icon: (
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
                <path d="M12 6c1 1 3 2 4 4s0 4-1 5" />
                <path d="M12 6c-1 1-3 2-4 4s0 4 1 5" />
                <path d="M12 10c1.5 1 3.5 3 3.5 5s-1 3-3.5 3" />
                <path d="M12 10c-1.5 1-3.5 3-3.5 5s1 3 3.5 3" />
                <circle cx="9" cy="7" r="0.5" fill="currentColor" />
                <circle cx="15" cy="8" r="0.5" fill="currentColor" />
                <circle cx="8" cy="14" r="0.5" fill="currentColor" />
                <circle cx="16" cy="13" r="0.5" fill="currentColor" />
            </svg>
        )
    },
    {
        id: 3,
        title: "Sensitive Skin",
        description: "Sensitive skin is easily irritated, prone to redness, dryness, and reactions to environmental factors or products.",
        icon: (
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                <circle cx="12" cy="10" r="3" />
                <path d="M12 7v1" />
                <path d="M12 12v1" />
                <path d="M9.5 10h-1" />
                <path d="M15.5 10h-1" />
            </svg>
        )
    },
    {
        id: 4,
        title: "Acne-Prone Skin",
        description: "Acne-prone skin requires gentle care, non-comedogenic products, and calming ingredients to prevent breakouts and irritation.",
        icon: (
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20" />
                <path d="M12 4c2 0 4 2 4 4s-2 3-4 3-4-1-4-3 2-4 4-4z" />
                <path d="M12 11c2.5 0 5 2.5 5 5.5s-2.5 4.5-5 4.5-5-1.5-5-4.5 2.5-5.5 5-5.5z" />
                <circle cx="16" cy="6" r="0.5" fill="currentColor" />
                <circle cx="8" cy="15" r="0.5" fill="currentColor" />
                <circle cx="15" cy="18" r="0.5" fill="currentColor" />
            </svg>
        )
    }
];

const SkinTypes = () => {
    return (
        <section className="skin-types-section fade-in">
            <div className="container">
                <div className="skin-types-grid">
                    {skinTypes.map(type => (
                        <div key={type.id} className="skin-type-card">
                            <div className="skin-type-icon">
                                {type.icon}
                            </div>
                            <h3 className="serif">{type.title}</h3>
                            <p>{type.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkinTypes;
