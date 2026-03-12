import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import './OurProducts.css';

const OurProducts = () => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);

    useEffect(() => {
        const cards = sectionRef.current?.querySelectorAll('.our-product-card');
        if (!cards) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 100}ms`;
            observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    // Selecting specific core products to match the requested 3x2 grid look
    const coreProducts = products.filter(p => [1, 2, 3, 4, 5, 6,7].includes(p.id));

    return (
        <section className="products-section our-products-section" ref={sectionRef}>
            <div className="container">
                <marquee>Ceramoiz || Glazzium || Uvinor || Acnevor CN || Acnevor || SertaFree</marquee>
                <h2 className="our-products-title serif">Our Product</h2>
                <div className="our-products-grid">
                    {coreProducts.map(product => (
                        <div
                            key={product.id}
                            className="our-product-card"
                            onClick={() => navigate(`/product/${product.id}`)}
                        >
                            <div className="our-product-image-container">
                                <img src={product.image} alt={product.name} className="our-product-image" />
                            </div>
                            <h3 className="our-product-name">{product.name.split('-')[0]}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurProducts;
