import React, { useState } from 'react';
import './ProductAccordion.css';

const ProductAccordion = ({ product }) => {
    const [openSection, setOpenSection] = useState(null);
    const [openSubSection, setOpenSubSection] = useState('acne'); // Default open subsection

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const toggleSubSection = (subSection) => {
        setOpenSubSection(openSubSection === subSection ? null : subSection);
    };

    const sections = [
        { id: 'benefits', title: 'Benefits' },
        { id: 'ingredients', title: 'Ingredients' },
        { id: 'before-after', title: 'Before/After' },
        { id: 'usage', title: 'Usage' },
        { id: 'faq', title: 'Honest Answers for Common Questions' },
        { id: 'other', title: 'Other Information' },
        { id: 'legal', title: 'Legal Metrology' },
    ];

    const benefitItems = [
        {
            id: 'acne',
            title: 'Reduces Acne & Breakouts',
            content: 'Aloe vera gel works wonders on acne. Dab a little on the spot, and watch it disappear. It also helps fade acne scars, leaving your skin looking clear and refreshed.'
        },
        {
            id: 'healing',
            title: 'Accelerates Healing',
            content: 'Its natural properties support skin regeneration, helping minor cuts, burns, and blemishes heal faster and more effectively.'
        },
        {
            id: 'soothing',
            title: 'Soothes & Calms Skin',
            content: 'Instantly cools and calms irritated or sunburnt skin, reducing redness and discomfort while providing deep hydration.'
        },
        {
            id: 'hair',
            title: "Hair's Superhero",
            content: 'Conditions the scalp, reduces dandruff, and promotes healthier, shinier hair by locking in moisture without feeling greasy.'
        }
    ];

    return (
        <div className="product-accordion-wrapper">
            <div className="container">
                <div className="accordion-list">
                    {sections.map((section) => (
                        <div key={section.id} className="accordion-item">
                            <button
                                className={`accordion-header ${openSection === section.id ? 'active' : ''}`}
                                onClick={() => toggleSection(section.id)}
                            >
                                <span className="accordion-title serif">{section.title}</span>
                                <span className="accordion-icon">
                                    {openSection === section.id ? '⌃' : '⌄'}
                                </span>
                            </button>

                            {openSection === section.id && (
                                <div className="accordion-content fade-in">
                                    {section.id === 'benefits' ? (
                                        <div className="benefits-grid">
                                            <div className="benefits-image-wrapper">
                                                {product?.image ? (
                                                    <img src={product.image} alt={product.name} className="benefits-image" />
                                                ) : (
                                                    <div className="benefits-image-placeholder" style={{ backgroundColor: product?.color || '#eef3e6' }}></div>
                                                )}
                                            </div>
                                            <div className="benefits-sub-accordion">
                                                {benefitItems.map((item) => (
                                                    <div key={item.id} className="sub-accordion-item">
                                                        <button
                                                            className="sub-accordion-header"
                                                            onClick={() => toggleSubSection(item.id)}
                                                        >
                                                            <span className="sub-accordion-title">{item.title}</span>
                                                            <span className="sub-accordion-icon">
                                                                {openSubSection === item.id ? '−' : '+'}
                                                            </span>
                                                        </button>
                                                        {openSubSection === item.id && (
                                                            <div className="sub-accordion-content fade-in">
                                                                <p>{item.content}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="accordion-generic-content">
                                            <p>Information about {section.title.toLowerCase()} will be displayed here.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductAccordion;
