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
        features: ["SPF 50+ Protection", "Skin Brightening", "Non-greasy Formula", "Dermatologist Tested"]
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
        features: ["Ceramide Enriched", "24h Hydration", "Fragrance Free", "Deep Nourishment"]
    },
    {
        id: 3,
        name: "Glazzium- antiacne detoxofying tace wash",
        image: glazziumImg,
        description: "Gentle yet effective cleanser that removes toxins and prevents breakouts.",
        category: "Cleanser",
        color: "#e8f0f2",
        price: 29,
        rating: 4.7,
        reviewsCount: 98,
        features: ["Detoxifying Action", "Oil Control", "Gentle Cleansing", "Anti-acne Properties"]
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
        features: ["Clinical Grade", "Pore Minimizing", "Sebum Control", "Fast Acting"]
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
        features: ["Anti-inflammatory", "Texture Improvement", "Soothing Effect", "Dermatological Solution"]
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
        features: ["Fast Relief", "Skin Restoration", "Intensive Care", "Safe for Sensitive Skin"]
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
        features: ["Internal Nutrition", "Hair & Skin Health", "Vitamins & Minerals", "Complete Daily Supplement"]
    }
];
