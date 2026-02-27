import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import './OurProducts.css';

const OurProducts = () => {
    const navigate = useNavigate();

    // Selecting specific core products to match the requested 3x2 grid look
    const coreProducts = products.filter(p => [1, 2, 3, 4, 5, 6].includes(p.id));

    return (
        <section className="our-products-section">
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
