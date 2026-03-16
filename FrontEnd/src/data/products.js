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
        Target:["Target Consumer Group:For Adults (Moderate Men & Women)"],
        features: ["Supports bone strength and joint health", "Supports overall nutritional balance", "Helps maintain energy levels and metabolism", "Helps improve general wellness"],
        details: {
            benefits: [
                { id: 'hair-growth', title: 'Hair Growth', content: 'Calgro™ – Nutraceutical Tablets:\n• Vitamins\n\t◦ Boosts immunity and helps in antioxidant protection.\n\t◦ Support metabolism and energy production.\n\n• Minerals\n\t◦ Supports hair growth and strength\n\t◦ Improves scalp nourishment\n\t◦ Provides essential minerals for overall hair health\n\n• Amino Acid With Isoflavones and Grape Seed Extract Tablets\n\t◦ Grape seed extract helps protect hair with antioxidants\n\t◦ Improves hair thickness and volume.' },
                
            ],
            ingredients: [
                { id: 'actives', title: 'Ingredients', content:'\t• Vitamins (C, B3, B5, B6, B2, Folic Acid)\n\t• Minerals (Calcium, Magnesium, Iron, Zinc, Copper, Manganese)\n\t• Amino acids\n\t•Soy Isoflavones\n\t•Grape Seed Extract\n\t•Green Tea Extract' },
                { id: 'other', title: 'Other Ingredients', content:'• Binder (INS 1420 and 460(i))\n• Diluent (INS 341(ii))\n• Stabilizer (INS 1202)\n• Anti-caking Agent (INS 553(iii) and INS 470(iii))\n• Solvent for coating (MDC and IPA)\n• Class II Preservative (INS 219 and INS 216)\n• Contains Permitted Synthetic Food Colours.(INS 17).'},
            ],
            'before-after': [
                { id: 'Before ', title: 'Before Use', content: '• Excessive hair fall and breakage\n• Weak hair follicles and poor scalp nutrition\n• Thin, lifeless hair with low volume\n• Slow or uneven hair growth\n• Dull, unhealthy-looking hair' },
                {id: 'After', title:'After Use', content:'•Noticeable reduction in hair fall\n• Stronger, healthier hair follicles\n• Thicker, fuller hair with improved volume\n• Enhanced hair growth cycle\n•Healthier, shinier, and more resilient hair'},
            ],
            usage: [
                { id: 'apply', title: 'How to Use', content: '• Take 1 tablet twice daily\n• Consume after breakfast and dinner\n• Swallow with a glass of water\n• Use daily for best hair growth results\n• Follow the recommended dosage ' },
            ],
            faq: [
                { id: 'white-cast', title: 'Does it leave a white cast?', content: 'No, the ultra-sheer formula blends seamlessly into all skin tones.' }
            ],
            other: [
                { id: 'other information', title: 'Dosage', content: 'One tablet daily or directed bu the Health Practitioner.\n\n•KEEP OUT F REACH OF CHILDREN' },
                { id: 'storage', title:'Storage', content: '• Store below 25°C,\n• A cool & dry place\n• Protect from direct light\n• heart & moisture'},
                
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
        description: "Ceramois lotion this moisturizing lotion helps improve the health of dry skin. It helps prevent & protect dry skin for full 24 hours.",
        tar:"Ultra Nourishing Moisturizing Lotion Strengthens the skin barrier \n\t Ceramides + Hyaluronic Acid + Sheabutter",
        futch:"Invisible Hydration" +"\n\t" + "Normal to dry sensitive skin" +"\n\n"+"Formulated With"+"\n\t"+"Dermatologically Tested Actives",
        precautions:"Avoid contact with eyes. If irritation occurs, rinse thoroughly with water.",
        category: "Moisturizer",
        color: "#f5eceb",
        price: 299,
        rating: 4.9,
        reviewsCount: 6,
        features: ["Ceramide Enriched", "24h Hydration", "Fragrance Free", "Deep Nourishment"],
        details: {
            benefits: [
                { id: 'barrier', title: 'Key Benefits', content: '\t•Provides deep and long-lasting hydration for dry skin \n\t• Improves skin texture for smoother, softer skin \n\t• Strengthens the skin’s natural barrier \n\t• Nourishes and restores dry, dull skin \n\t• Leaves skin healthy, supple, and well-moisturized' },
                
            ],
            ingredients: [
                { id: 'ceramides', title: 'Ingredients', content: '\t•Aqua\n\t•White petroleum\n\t•Jelly\n\t•Olive oil\n\t•Glycerin\n\t•Isopropyl myristate\n\t•Shea Butter\n\t•Sunflower Oil\n\t•Cetomacrogol 1000\n\t•Emulsifying Wax\n\t•Almond Oil\n\t•Bees Wax\n\t•Ceto Stearyl Alcohol\n\t•YUZU Ceramind B (Butylene Glycol (and) Water (and)\n\t•Citrus Junos Fruit Extract)\n\t•Dimethicone\n\t•Phenoxyethanol and Ethylhexylglycerin\n\t•Cerbomer\n\t•Triethanolamine\n\t•GMS SE\n\t•Niacinamide\n\t•Betaine\n\t•Hyaluronic Acid\n\t•Aloe vera Juice\n\t•Jojoba Oil\n\t•Vit\n\t•E Acerate\n\t•ESTA\n\t•Fragrance' }
            ],
            'before-after': [
                { id: 'dryness', title: 'Before Use', content: '\t•Dry and rough skin texture\n\t•Lack of moisture and dull appearance\n\t•Weak skin barrier\n\t•Tight and uncomfortable skin\n\t•Visible dryness and flakiness ' },
                {id: 'dryness1', title: 'After Use', content:'\t•Deeply hydrated and moisturized skin\n\t•Smoother and softer skin texture\n\t•Strengthened skin barrier\n\t•Healthy, nourished skin feel\n\t•Radiant and well-balanced skin'},
            ],
            usage: [
                { id: 'daily', title: 'Usage', content: '\t•Apply a small amount of lotion to clean, dry skin\n\t•Gently massage until fully absorbed\n\t•Use twice daily (morning and night) for best results\n\t•Apply on dry or rough areas for extra hydration\n\t•Use regularly to maintain soft, healthy skin' }
            ],
            faq: [
                { id: 'face-body', title: 'Can I use it on my face?', content: 'Yes, it is non-comedogenic and safe for both face and body.' }
            ],
            other: [
                { id: 'texture', title: 'Storage', content: 'Stroe in a cool and dry place below 30°C.\n\t•It is mandatory to perform a patch test before applying this product.\n\t•Do not use on cracked skin or open wounds.\n\t•In  case any irritation occurs stop the use of product with immediate effect and consult your dermatologist.\n\t•KEEP OUT OF REACH OF CHILDREN. ' }
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
                { id: 'uv-protection', title: 'Superior UV Protection', content: 'alcium & Magnesium \n•Support bone strength and improve skeletal health.\n\n Vitamin C\n•Boosts immunity and helps in antioxidant protection.' },
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
