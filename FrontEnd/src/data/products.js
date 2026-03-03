import uvinorImg from '../assets/images/sunscreen.png';
import ceramoizImg from '../assets/images/Moisturizing lotion.png';
import glazziumImg from '../assets/images/glazzium.png';
import acnevorImg from '../assets/images/Acnevor.png';
import acnevorCnImg from '../assets/images/clindamycin gel.png';
import sertaFreeImg from '../assets/images/seriaFree.png';
import cabGroImg from '../assets/images/tablets.png';

export const products = [
    {
        id: 1,
        name: "Uvinor-clear rediance skin brightening sunscreen",
        image: uvinorImg,
        description: "Advanced UV protection with skin-brightening agents for a clear, radiant complexion.",
        category: "Protection",
        color: "#e6f2ed",
        price: 29,
        rating: 4.8,
        reviewsCount: 124,
        features: ["SPF 50+ Protection", "Skin Brightening", "Non-greasy Formula", "Dermatologist Tested"],
        details: {
            benefits: [
                { id: 'uv-protection', title: 'Superior UV Protection', content: 'Broad-spectrum SPF 50+ PA+++ protects against both UVA and UVB rays, preventing sunburn and premature aging.' },
                { id: 'brightening', title: 'Skin Brightening', content: 'Formulated with Niacinamide and Vitamin C to help fade dark spots and even out skin tone.' }
            ],
            ingredients: [
                { id: 'actives', title: 'Key Actives', content: 'Zinc Oxide, Octinoxate, Niacinamide, and Vitamin C.' }
            ],
            'before-after': [
                { id: 'sunburn', title: 'Prevention of Sunburn', content: 'Clinical tests show 99% protection against UVB rays when applied correctly.' }
            ],
            usage: [
                { id: 'apply', title: 'Application', content: 'Apply liberally to face and neck 15 minutes before sun exposure.' }
            ],
            faq: [
                { id: 'white-cast', title: 'Does it leave a white cast?', content: 'No, the ultra-sheer formula blends seamlessly into all skin tones.' }
            ],
            other: [
                { id: 'water-resistant', title: 'Water Resistance', content: 'Water-resistant for up to 80 minutes.' }
            ],
            legal: [
                { id: 'mfg', title: 'Manufacturer', content: 'Sholash Life Science Pvt. Ltd.' }
            ]
        }
    },
    {
        id: 2,
        name: "Ceramoiz- uitra nourishing moisturizing lotion",
        image: ceramoizImg,
        description: "Strengthens the skin barrier while providing intense, long-lasting hydration.",
        category: "Moisturizer",
        color: "#f5eceb",
        price: 29,
        rating: 4.9,
        reviewsCount: 156,
        features: ["Ceramide Enriched", "24h Hydration", "Fragrance Free", "Deep Nourishment"],
        details: {
            benefits: [
                { id: 'barrier', title: 'Barrier Repair', content: 'Ceramides 1, 3, and 6-II help restore the skin\'s natural protective barrier.' },
                { id: 'hydration', title: 'Deep Hydration', content: 'Hyaluronic acid locks in moisture for 24-hour hydration.' }
            ],
            ingredients: [
                { id: 'ceramides', title: 'Ceramide Complex', content: 'Essential ceramides and fatty acids for skin health.' }
            ],
            'before-after': [
                { id: 'dryness', title: 'Dryness Relief', content: 'Visible reduction in skin flakiness after just one use.' }
            ],
            usage: [
                { id: 'daily', title: 'Daily Use', content: 'Apply morning and night to clean, dry skin.' }
            ],
            faq: [
                { id: 'face-body', title: 'Can I use it on my face?', content: 'Yes, it is non-comedogenic and safe for both face and body.' }
            ],
            other: [
                { id: 'texture', title: 'Non-Greasy', content: 'Absorbs quickly without leaving any oily residue.' }
            ],
            legal: [
                { id: 'reg', title: 'Regulatory', content: 'Complaint with cosmetic standards.' }
            ]
        }
    },
    {
        id: 3,
        name: "Glazzium- antiacne detoxofying face wash",
        image: glazziumImg,
        description: "Gentle yet effective cleanser that removes toxins and prevents breakouts.",
        category: "Cleanser",
        color: "#e8f0f2",
        price: 29,
        rating: 4.7,
        reviewsCount: 98,
        features: ["Detoxifying Action", "Oil Control", "Gentle Cleansing", "Anti-acne Properties"],
        details: {
            benefits: [
                { id: 'detox', title: 'Detoxifying', content: 'Removes environmental pollutants and excess sebum from deep within pores.' },
                { id: 'acne-prevention', title: 'Prevents Breakouts', content: 'Salicylic acid helps clear pores and reduce acne-causing bacteria.' }
            ],
            ingredients: [
                { id: 'salicylic', title: 'Salicylic Acid', content: 'A BHA that exfoliates and clears pores.' }
            ],
            'before-after': [
                { id: 'oil', title: 'Oil Control', content: 'Reduces surface oil by 50% after the first wash.' }
            ],
            usage: [
                { id: 'wash', title: 'Washing Instructions', content: 'Massge onto damp skin for 30 seconds, then rinse thoroughly.' }
            ],
            faq: [
                { id: 'drying', title: 'Will it dry out my skin?', content: 'No, it contains soothing agents to maintain skin moisture balance.' }
            ],
            other: [
                { id: 'type', title: 'Skin Type', content: 'Best for oily and acne-prone skin.' }
            ],
            legal: [
                { id: 'safety', title: 'Safety Info', content: 'Dermatologically tested.' }
            ]
        }
    },
    {
        id: 4,
        name: "Acnevor- adapalene & clindamycin phosphate gel",
        image: acnevorImg,
        description: "Powerful treatment that controls sebum and minimizes the appearance of pores.",
        category: "Treatment",
        color: "#f0f0f0",
        price: 29,
        rating: 4.6,
        reviewsCount: 112,
        features: ["Clinical Grade", "Pore Minimizing", "Sebum Control", "Fast Acting"],
        details: {
            benefits: [
                { id: 'dual-action', title: 'Dual Action', content: 'Combines a retinoid with an antibiotic to treat current acne and prevent new ones.' },
                { id: 'pores', title: 'Pore Refinement', content: 'Reduces the appearance of enlarged pores over time.' }
            ],
            ingredients: [
                { id: 'formulas', title: 'Active Formula', content: 'Adapalene 0.1% and Clindamycin 1%.' }
            ],
            'before-after': [
                { id: 'acne-reduction', title: 'Acne Reduction', content: '60% reduction in inflammatory lesions after 4 weeks.' }
            ],
            usage: [
                { id: 'night', title: 'Night Application', content: 'Apply a thin layer to affected areas once daily at bedtime.' }
            ],
            faq: [
                { id: 'purging', title: 'Will I experience purging?', content: 'Some initial breakouts may occur as the skin adjusts to the retinoid.' }
            ],
            other: [
                { id: 'sun-sensitivity', title: 'Sun Sensitivity', content: 'Use sunscreen daily, as this product increases sun sensitivity.' }
            ],
            legal: [
                { id: 'rx', title: 'Prescription', content: 'Use as directed by a healthcare professional.' }
            ]
        }
    },
    {
        id: 5,
        name: "Acnevor cn-clindamycin phosphate nicotinamide gel",
        image: acnevorCnImg,
        description: "Reduces inflammation and improves overall skin texture for smoother skin.",
        category: "Treatment",
        color: "#ebf2f5",
        price: 29,
        rating: 4.8,
        reviewsCount: 143,
        features: ["Anti-inflammatory", "Texture Improvement", "Soothing Effect", "Dermatological Solution"],
        details: {
            benefits: [
                { id: 'inflammation', title: 'Reduces Redness', content: 'Nicotinamide significantly reduces the redness and swelling associated with acne.' },
                { id: 'texture', title: 'Texture Smoothing', content: 'Improves the overall smoothness and clarity of the skin.' }
            ],
            ingredients: [
                { id: 'cn-actives', title: 'Active Ingredients', content: 'Clindamycin Phosphate and Nicotinamide.' }
            ],
            'before-after': [
                { id: 'redness', title: 'Redness Relief', content: 'Visible calming of active acne within 48 hours.' }
            ],
            usage: [
                { id: 'spot-treat', title: 'Spot Treatment', content: 'Apply directly to blemishes twice daily.' }
            ],
            faq: [
                { id: 'moisturizer', title: 'Can I use moisturizer?', content: 'Yes, apply after the gel has completely absorbed.' }
            ],
            other: [
                { id: 'storage-temp', title: 'Temperature', content: 'Store at room temperature below 25°C.' }
            ],
            legal: [
                { id: 'mfg-info', title: 'Manufacturing', content: 'Certified GMP facility.' }
            ]
        }
    },
    {
        id: 6,
        name: "Serta free™-sertaconazole nitrate cream",
        image: sertaFreeImg,
        description: "Effective relief and restoration for various skin sensitivities and conditions.",
        category: "Special Care",
        color: "#f2f5e9",
        price: 29,
        rating: 4.9,
        reviewsCount: 187,
        features: ["Fast Relief", "Skin Restoration", "Intensive Care", "Safe for Sensitive Skin"],
        details: {
            benefits: [
                { id: 'antifungal', title: 'Antifungal Action', content: 'Effectively treats various fungal skin infections and prevents recurrence.' },
                { id: 'relief', title: 'Itching Relief', content: 'Provides rapid relief from itching, burning, and irritation.' }
            ],
            ingredients: [
                { id: 'serta', title: 'Active Component', content: 'Sertaconazole Nitrate 2% w/w.' }
            ],
            'before-after': [
                { id: 'infection-clear', title: 'Infection Clearing', content: 'Most infections clear within 7-14 days of consistent application.' }
            ],
            usage: [
                { id: 'cream-apply', title: 'Application', content: 'Apply twice daily to affected area and surrounding skin.' }
            ],
            faq: [
                { id: 'contagious', title: 'Is it contagious?', content: 'Fungal infections can be contagious; maintain good hygiene during treatment.' }
            ],
            other: [
                { id: 'duration', title: 'Treatment Duration', content: 'Continue use for the full recommended period, even if symptoms disappear.' }
            ],
            legal: [
                { id: 'schedule', title: 'Schedule', content: 'Schedule H Drug.' }
            ]
        }
    },
    {
        id: 7,
        name: "Cab gro- nutraceutical",
        image: cabGroImg,
        description: "Complete nutrition for skin and hair health from within.",
        category: "Nutraceutical",
        color: "#f5f0e6",
        price: 29,
        rating: 4.5,
        reviewsCount: 84,
        features: ["Internal Nutrition", "Hair & Skin Health", "Vitamins & Minerals", "Complete Daily Supplement"],
        details: {
            benefits: [
                { id: 'hair-growth', title: 'Hair Growth', content: 'Biotin and amino acids promote stronger, thicker hair growth from the roots.' },
                { id: 'skin-health', title: 'Skin Radiance', content: 'Antioxidants protect skin from internal stress and improve glow.' }
            ],
            ingredients: [
                { id: 'vits', title: 'Vitamins', content: 'Biotin, Zinc, Iron, and Vitamin B-Complex.' }
            ],
            'before-after': [
                { id: 'hair-fall', title: 'Reduced Hair Fall', content: 'Noticeable reduction in hair fall after 3 months of regular intake.' }
            ],
            usage: [
                { id: 'tablet', title: 'Dosage', content: 'Take one tablet daily after a meal, or as directed by your physician.' }
            ],
            faq: [
                { id: 'ayurvedic', title: 'Is it ayurvedic?', content: 'It is a scientifically formulated nutraceutical supplement.' }
            ],
            other: [
                { id: 'vegetarian', title: 'Dietary Info', content: '100% Vegetarian tablets.' }
            ],
            legal: [
                { id: 'fssai', title: 'FSSAI Approved', content: 'Certified as a safe dietary supplement.' }
            ]
        }
    }
];
