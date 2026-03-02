import React, { useState } from 'react';
import './ProductAccordion.css';

const ProductAccordion = ({ product }) => {
    const [openSection, setOpenSection] = useState(null);
    const [openSubSection, setOpenSubSection] = useState('acne'); // Default open subsection

    const sectionContent = {
        benefits: [
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
        ],
        ingredients: [
            {
                id: 'key-ingredients',
                title: 'Key Active Ingredients',
                content: 'Contains Purified Water, Aloe Barbadensis Leaf Extract, Carbomer, Triethanolamine, and Methylparaben for optimal skin health.'
            },
            {
                id: 'natural-extracts',
                title: 'Natural Extracts',
                content: 'Enriched with Vitamin E and botanical extracts that provide antioxidant protection and deep nourishment.'
            }
        ],
        'before-after': [
            {
                id: 'results-1',
                title: 'Visible Results after 2 Weeks',
                content: 'Users reported a 40% reduction in redness and improved skin texture within the first 14 days of consistent use.'
            },
            {
                id: 'results-2',
                title: 'Long-term Benefits',
                content: 'After 8 weeks, 95% of participants saw a significant improvement in skin hydration and overall radiance.'
            }
        ],
        usage: [
            {
                id: 'daily-routine',
                title: 'How to Apply',
                content: 'Apply a generous amount to clean skin. Massage gently in upward circular motions until fully absorbed. Use twice daily.'
            },
            {
                id: 'pro-tips',
                title: 'Pro Tips',
                content: 'For an extra cooling effect, store the gel in the refrigerator before application, especially for sunburnt skin.'
            }
        ],
        faq: [
            {
                id: 'suitable-for',
                title: 'Is it suitable for sensitive skin?',
                content: 'Yes, our formula is dermatologist-tested and specifically designed to be gentle on all skin types, including sensitive skin.'
            },
            {
                id: 'sticky-residue',
                title: 'Does it leave a sticky residue?',
                content: 'No, the lightweight formula absorbs quickly into the skin without leaving any greasy or sticky feeling.'
            }
        ],
        other: [
            {
                id: 'storage',
                title: 'Storage Instructions',
                content: 'Keep in a cool, dry place away from direct sunlight. Ensure the cap is tightly closed after each use.'
            },
            {
                id: 'precautions',
                title: 'Precautions',
                content: 'For external use only. Avoid contact with eyes. If irritation occurs, discontinue use and consult a dermatologist.'
            }
        ],
        legal: [
            {
                id: 'manufacturer',
                title: 'Manufacturer Details',
                content: 'Manufactured by Sholash Life Science Pvt. Ltd. at our state-of-the-art facility adhering to international quality standards.'
            },
            {
                id: 'compliance',
                title: 'Regulatory Compliance',
                content: 'Approved by relevant health authorities. All ingredients are listed in accordance with legal metrology requirements.'
            }
        ]
    };

    const toggleSection = (sectionId) => {
        if (openSection === sectionId) {
            setOpenSection(null);
        } else {
            setOpenSection(sectionId);
            // Reset subsection when switching main sections
            setOpenSubSection(sectionContent[sectionId]?.[0]?.id || null);
        }
    };

    const toggleSubSection = (subSectionId) => {
        setOpenSubSection(openSubSection === subSectionId ? null : subSectionId);
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
                                    {openSection === section.id ? '⌃' : 'V'}
                                </span>
                            </button>

                            {openSection === section.id && (
                                <div className="accordion-content fade-in">
                                    <div className="benefits-grid">
                                        <div className="benefits-image-wrapper">
                                            {product?.image ? (
                                                <img src={product.image} alt={product.name} className="benefits-image" />
                                            ) : (
                                                <div className="benefits-image-placeholder" style={{ backgroundColor: product?.color || '#eef3e6' }}></div>
                                            )}
                                        </div>
                                        <div className="benefits-sub-accordion">
                                            {sectionContent[section.id]?.map((item) => (
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
