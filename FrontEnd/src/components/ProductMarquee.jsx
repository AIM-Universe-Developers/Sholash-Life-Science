import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { products as staticProducts } from '../data/products';
import './ProductMarquee.css';

const ProductMarquee = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllProducts = async () => {
            let combined = [];
            try {
                const res = await axios.get('/api/products');
                if (res.data.success) {
                    combined = res.data.data;
                }
            } catch (err) {
                console.error('API Error in Marquee:', err);
            }

            // Merge with static
            const apiNames = new Set(combined.map(p => p.name.toLowerCase().split('–')[0].trim()));
            const uniqueStatic = staticProducts.filter(p => !apiNames.has(p.name.toLowerCase().split('–')[0].trim()));
            setProducts([...combined, ...uniqueStatic]);
        };
        fetchAllProducts();
    }, []);

    const getImageUrl = (product) => {
        if (product.images && product.images.length > 0) {
            let img = product.images[0].replace(/\\/g, '/');
            if (img.startsWith('http')) return img;
            return img.startsWith('/') ? img : `/${img}`;
        }
        return product.image || '';
    };

    if (products.length === 0) return null;

    // Triple the products array to ensure a seamless infinite scroll even on large screens
    const displayProducts = [...products, ...products, ...products];

    return (
        <div className="product-marquee-section">
            <div className="container">
                <h2 className="marquee-title serif">You Might Also Like</h2>
            </div>
            <div className="marquee-wrapper">
                <div className="marquee-content">
                    {displayProducts.map((product, index) => (
                        <div
                            key={index}
                            className="marquee-product-card"
                            onClick={() => navigate(`/product/${product._id || product.id}`)}
                        >
                            <div className="marquee-image-box glass">
                                <img src={getImageUrl(product)} alt={product.name} />
                            </div>
                            <div className="marquee-info">
                                <span className="cat">{typeof product.category === 'object' ? product.category.name : product.category}</span>
                                <h3>{product.name.split('–')[0]}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductMarquee;
