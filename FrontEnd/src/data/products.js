import calgroImg from '../assets/product image/tablet box.png';
import ceramoisImg from '../assets/PRODUCT HOME IMAGE/lotion.png';
import glazziumImg from '../assets/PRODUCT HOME IMAGE/glazzium face wash.png';
import uvinorImg from '../assets/PRODUCT HOME IMAGE/Sunscreen2.png';
import sertafreeImg from '../assets/PRODUCT HOME IMAGE/Serta Free.png';
import acnevorCnImg from '../assets/PRODUCT HOME IMAGE/Acnevor CN.png';
import acnevorImg from '../assets/PRODUCT HOME IMAGE/Acnevor Gel.png';

export const products = [
    {
        id: 1,
        name: "Calgro™ – Nutraceutical Tablets",
        tagline: " Complete Nutritional Support for Stronger Bones, Better Energy, and Overall Wellness.",
        image: calgroImg,

        description: "Calgro™ is a nutraceutical supplement formulated with vitamins, minerals, amino acids,and botanical extracts to support overall health and nutrition.",
        category: "Protection",
        color: "#e6f2ed",
        price: 499,
        rating: 4.8,
        reviewsCount: 6,
        features: ["Supports bone strength and joint health", "Supports overall nutritional balance", "Helps maintain energy levels and metabolism", "Helps improve general wellness"],
        details: {
            benefits: [
                { id: 'uv-protection', title: 'Superior UV Protection', content: 'Calcium & Magnesium \n•Support bone strength and improve skeletal health.\n\n Vitamin C\n•Boosts immunity and helps in antioxidant protection.' },
                { id: 'brightening', title: 'Skin Brightening', content: 'Formulated with Niacinamide and Vitamin C to help fade dark spots and even out skin tone.' }
            ],
            ingredients: [
                { id: 'actives', title: 'Key Actives', content: 'Calgro™ contains a balanced blend of:\n\nVitamins\n•	Vitamin C\n•	Vitamin B5\n•	Vitamin B3\n•	Vitamin B6\n•	Vitamin B2\n•	Folic Acid\n\nMinerals\n•	Calcium\n•	Magnesium\n•	Iron\n•	Zinc\n•	Manganese\n•	Copper\n\nEssential Amino Acids\n•	L-Leucine\n•	L-Isoleucine\n•	L-Valine\n•	L-Lysine\n•	L-Threonine\n•	L-Tryptophan\n•	L-Histidine\n•	L-Phenylalanine\n\nBotanical Extracts\n•	Soy Isoflavones\n•	Grape Seed Extract\n•	Green Tea Extract\n•	Beetroot Extract\n•	Choline Bitartrate' }
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
        name: "Ceramois™ – Ultra Nourishing Moisturizing Lotion",
        tagline: "Deep Hydration. Stronger Skin Barrier. All-Day Moisture.",
        image: ceramoisImg,
        description: "Strengthens the skin barrier while providing intense, long-lasting hydration.",
        category: "Moisturizer",
        color: "#f5eceb",
        price: 299,
        rating: 4.9,
        reviewsCount: 6,
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
        name: "Glazzium™ – Anti-Acne Detoxifying Face Wash",
        tagline: " Deep Clean. Oil Control. Clear & Healthy Skin.",
        image: glazziumImg,
        description: "Gentle yet effective cleanser that removes toxins and prevents breakouts.",
        category: "Cleanser",
        color: "#e8f0f2",
        price: 698,
        rating: 4.7,
        reviewsCount: 6,
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
        name: "Uvinor™ – Clear Radiance Skin Brightening Sunscreen SPF 50+",
        tagline: "Powerful Sun Protection with Hydration and Skin Brightening.",
        image: uvinorImg,
        description: "Powerful treatment that controls sebum and minimizes the appearance of pores.",
        category: "Treatment",
        color: "#f0f0f0",
        price: 659,
        rating: 4.6,
        reviewsCount: 6,
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
        name: "SertaFree™ – Sertaconazole Nitrate Cream",
        tagline: " Effective Relief from Fungal Skin Infections",
        image: sertafreeImg,
        description: "Reduces inflammation and improves overall skin texture for smoother skin.",
        category: "Treatment",
        color: "#ebf2f5",
        price: 270,
        rating: 4.8,
        reviewsCount: 6,
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
        name: "Acnevor CN™ – Clindamycin & Nicotinamide Gel",
        tagline: " Targeted Treatment for Acne & Skin Inflammation.",
        image: acnevorCnImg,
        description: "Effective relief and restoration for various skin sensitivities and conditions.",
        category: "Special Care",
        color: "#f2f5e9",
        price: 480,
        rating: 4.9,
        reviewsCount: 6,
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
        name: "Acnevor™ – Adapalene & Clindamycin Phosphate Gel",
        tagline: "Advanced Dual Action Acne Therapy",
        image: acnevorImg,
        description: "Complete nutrition for skin and hair health from within.",
        category: "Nutraceutical",
        color: "#f5f0e6",
        price: 689,
        rating: 4.5,
        reviewsCount: 6,
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
