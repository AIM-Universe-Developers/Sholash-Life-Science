const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");
const Category = require("./models/Category");

const staticProducts = [
    {
        name: "Calgro™ – Nutraceutical Tablets",
        tagline: " Complete Nutritional Support for Stronger Bones, Better Energy, and Overall Wellness.",
        image: "/src/assets/product image/tablet box.png",
        hoverImage: "/src/assets/product image/tablet box-1.png",
        description: "Calgro™ is a nutraceutical supplement formulated with vitamins, minerals, amino acids,and botanical extracts to support overall health and nutrition.",
        categoryName: "Protection",
        color: "#e6f2ed",
        price: 325.00,
        rating: 4.8,
        reviewsCount: 6,
        stock: 100,
        features: ["Supports bone strength and joint health", "Supports overall nutritional balance", "Helps maintain energy levels and metabolism", "Helps improve general wellness"],
    },
    {
        name: "Ceramois™ – Ultra Nourishing Moisturizing Lotion",
        tagline: "Deep Hydration. Stronger Skin Barrier. All-Day Moisture.",
        image: "/src/assets/PRODUCT HOME IMAGE/lotion.png",
        hoverImage: "/src/assets/product image/skin care routine -1.png",
        description: "Ceramois lotion this moisturizing lotion helps improve the health of dry skin. It helps prevent & protect dry skin for full 24 hours.",
        categoryName: "Moisturizer",
        color: "#f5eceb",
        price: 690.00,
        rating: 4.9,
        reviewsCount: 6,
        stock: 100,
        features: ["Ceramide Enriched", "24h Hydration", "Fragrance Free", "Deep Nourishment"],
    },
    {
        name: "Glazzium™ – Anti-Acne Detoxifying Face Wash",
        tagline: " Deep Clean. Oil Control. Clear & Healthy Skin.",
        image: "/src/assets/PRODUCT HOME IMAGE/glazzium face wash.png",
        hoverImage: "/src/assets/product image/skin care routine -2.png",
        description: "Glazzium face wash is a gently exfoliating and enriched with natural extracs that reach deep into your skins blocked pores to remove trapped oil, toxins, dead skin and acne.",
        categoryName: "Cleanser",
        color: "#e8f0f2",
        price: 392.00,
        rating: 4.7,
        reviewsCount: 6,
        stock: 100,
        features: ["Detoxifying Action", "Oil Control", "Gentle Cleansing", "Anti-acne Properties"],
    },
    {
        name: "Uvinor™ – Clear Radiance Skin Brightening Sunscreen SPF 50+",
        tagline: "Powerful Sun Protection with Hydration and Skin Brightening.",
        image: "/src/assets/PRODUCT HOME IMAGE/Sunscreen2.png",
        hoverImage: "/src/assets/product image/Sunscreen.png",
        description: "Uvinor SPF 50+ helps protect sensitive skin from UV induced damage and also acts as a mositrurizer.",
        categoryName: "Treatment",
        color: "#f0f0f0",
        price: 498.00,
        rating: 4.6,
        reviewsCount: 6,
        stock: 100,
        features: ["Clinical Grade", "Pore Minimizing", "Sebum Control", "Fast Acting"],
    },
    {
        name: "SertaFree™ – Sertaconazole Nitrate Cream",
        tagline: " Effective Relief from Fungal Skin Infections",
        image: "/src/assets/PRODUCT HOME IMAGE/Serta Free.png",
        hoverImage: "/src/assets/product image/Serta Free.png",
        description: "Broad-spectrum antifungal cream with Sertaconazole Nitrate,Effectively treats fungal infections like ringworm, athlete’s foot & jock itch.",
        categoryName: "Treatment",
        color: "#ebf2f5",
        price: 232.00,
        rating: 4.8,
        reviewsCount: 6,
        stock: 100,
        features: ["Anti-inflammatory", "Texture Improvement", "Soothing Effect", "Dermatological Solution"],
    },
    {
        name: "Acnevor CN™ – Clindamycin Phosphate & Nicotinamide Gel",
        tagline: " Targeted Treatment for Acne & Skin Inflammation.",
        image: "/src/assets/PRODUCT HOME IMAGE/Acnevor CN.png",
        hoverImage: "/src/assets/product image/Acnevor CN with Box.png",
        description: "Advanced anti-acne gel with Clindamycin & Nicotinamide,Targets acne-causing bacteria and reduces inflammation.",
        categoryName: "Special Care",
        color: "#f2f5e9",
        price: 186.00,
        rating: 4.9,
        reviewsCount: 6,
        stock: 100,
        features: ["Fast Relief", "Skin Restoration", "Intensive Care", "Safe for Sensitive Skin"],
    },
    {
        name: "Acnevor™ – Adapalene & Clindamycin Phosphate Gel",
        tagline: "Advanced Dual Action Acne Therapy",
        image: "/src/assets/PRODUCT HOME IMAGE/Acnevor Gel.png",
        hoverImage: "/src/assets/product image/Acnevor with box.png",
        description: "Advanced acne treatment gel combining Adapalene (retinoid) & Clindamycin (antibiotic). Targets acne at the root by unclogging pores.",
        categoryName: "Nutraceutical",
        color: "#f5f0e6",
        price: 255.00,
        rating: 4.5,
        reviewsCount: 6,
        stock: 100,
        features: ["Internal Nutrition", "Hair & Skin Health", "Vitamins & Minerals", "Complete Daily Supplement"],
    }
];

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sholash")
    .then(async () => {
        console.log("Connected to MongoDB...");
        
        try {
            await Product.deleteMany({});
            
            for (let prod of staticProducts) {
                // Ensure category exists
                let category = await Category.findOne({ name: prod.categoryName });
                if (!category) {
                    category = await Category.create({ 
                        name: prod.categoryName, 
                        description: `${prod.categoryName} category` 
                    });
                }
                
                await Product.create({
                    name: prod.name,
                    description: prod.description,
                    tagline: prod.tagline,
                    price: prod.price,
                    stock: prod.stock,
                    category: category._id,
                    color: prod.color,
                    rating: prod.rating,
                    numReviews: prod.reviewsCount,
                    features: prod.features,
                    images: [prod.image, prod.hoverImage],
                    details: {}
                });
            }
            console.log("SUCCESSFULLY seeded products into the DB!");
            process.exit(0);
        } catch (err) {
            console.error("Error seeding DB:", err);
            process.exit(1);
        }
    })
    .catch((err) => {
        console.error("DB Connection Error:", err);
        process.exit(1);
    });
