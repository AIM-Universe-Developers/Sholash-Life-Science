import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ searchQuery = '', onAddToCart, onBuyClick }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const params = {};
                if (searchQuery.trim()) params.search = searchQuery;
                const res = await axios.get('/api/products', { params });
                if (res.data.success) {
                    setProducts(res.data.data || []);
                }
            } catch (err) {
                console.error('Failed to fetch products', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [searchQuery]);

    const getImageUrl = (product, hover = false) => {
        if (product.images && product.images.length > 0) {
            let imgStr = hover && product.images[1] ? product.images[1] : product.images[0];
            const img = imgStr.replace(/\\/g, '/');
            if (img.startsWith('http')) return img;
            return img.startsWith('/') ? img : `/${img}`;
        }
        if (hover && product.hoverImage) return product.hoverImage;
        return product.image || '';
    };

    if (loading) {
        return (
            <section id="products" className="product-section">
                <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <p>Loading products...</p>
                </div>
            </section>
        );
    }

    return (
        <section id="products" className="product-section">
            <div className="container">
                <div className="section-header fade-in">
                    <marquee>
                        {products.map(p => p.name.split('–')[0].trim()).join(' || ')}
                    </marquee>
                    <span className="subtitle">Curated Care</span>
                    <h2 className="serif">Our Signature Collection</h2>
                    <p className="section-description">
                        Discover our range of dermatologist-tested solutions tailored for your unique skin needs.
                    </p>
                </div>

                {products.length > 0 ? (
                    <div className="product-grid">
                        {products.map(product => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                description={product.description}
                                category={product.category?.name || product.category}
                                color={product.color}
                                image={getImageUrl(product)}
                                hoverImage={getImageUrl(product, true)}
                                price={product.price}
                                rating={product.rating}
                                reviewsCount={product.numReviews}
                                onAddToCart={onAddToCart}
                                onBuyClick={onBuyClick}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-results fade-in" style={{ textAlign: 'center', padding: '4rem 0', opacity: 0.6 }}>
                        <h3 className="serif">No products found</h3>
                        <p>We couldn't find any products matching "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductList;

