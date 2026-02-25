import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const products = [
    {
        id: 1,
        name: "Uvinor-clear rediance skin brightening sunscreen",
        description: "Advanced UV protection with skin-brightening agents for a clear, radiant complexion.",
        category: "Protection",
        color: "#e6f2ed",
        price: 29,
        rating: 4.8
    },
    {
        id: 2,
        name: "Ceramoiz- uitra nourishing moisturizing lotion",
        description: "Strengthens the skin barrier while providing intense, long-lasting hydration.",
        category: "Moisturizer",
        color: "#f5eceb",
        price: 29,
        rating: 4.9
    },
    {
        id: 3,
        name: "Glazzium- antiacne detoxofying tace wash",
        description: "Gentle yet effective cleanser that removes toxins and prevents breakouts.",
        category: "Cleanser",
        color: "#e8f0f2",
        price: 29,
        rating: 4.7
    },
    {
        id: 4,
        name: "Acnevor- adapalene & clindamycin phosphate gel",
        description: "Powerful treatment that controls sebum and minimizes the appearance of pores.",
        category: "Treatment",
        color: "#f0f0f0",
        price: 29,
        rating: 4.6
    },
    {
        id: 5,
        name: "Acnevor cn-clindamycin phosphate nicotinamide gel",
        description: "Reduces inflammation and improves overall skin texture for smoother skin.",
        category: "Treatment",
        color: "#ebf2f5",
        price: 29,
        rating: 4.8
    },
    {
        id: 6,
        name: "Serta free™-sertaconazole nitrate cream",
        description: "Effective relief and restoration for various skin sensitivities and conditions.",
        category: "Special Care",
        color: "#f2f5e9",
        price: 29,
        rating: 4.9
    },
    {
        id: 7,
        name: "Cab gro- nutraceutical",
        description: "Complete nutrition for skin and hair health from within.",
        category: "Nutraceutical",
        color: "#f5f0e6",
        price: 29,
        rating: 4.5
    }
];

const ProductList = ({ onAddToCart }) => {
    return (
        <section id="products" className="product-section">
            <div className="container">
                <div className="section-header fade-in">
                    <marquee>Sholash Life Sciences</marquee>
                    <span className="subtitle">Curated Care</span>
                    <h2 className="serif">Our Signature Collection</h2>
                    <p className="section-description">
                        Discover our range of dermatologist-tested solutions tailored for your unique skin needs.
                    </p>
                </div>
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            {...product}
                            onAddToCart={() => onAddToCart(product)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductList;
