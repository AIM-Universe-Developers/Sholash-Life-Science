import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { BASE_URL } from '../services/api';
import './HeroCarousel.css';

const HeroCarousel = () => {
    const navigate = useNavigate();
    const [offers, setOffers] = useState([]);
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [loading, setLoading] = useState(true);

    const getImageUrl = (img) => {
        if (!img) return '';
        img = img.replace(/\\/g, '/');
        if (img.startsWith('http')) return img;
        const BASE = BASE_URL;
        return img.startsWith('/') ? `${BASE}${img}` : `${BASE}/${img}`;
    };

    const fetchBanners = async () => {
        try {
            setLoading(true);
            const res = await api.get('/api/banners');
            if (res.data.success && res.data.data.length > 0) {
                setOffers(res.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch banners', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const length = offers.length;

    const nextSlide = useCallback(() => {
        if (length === 0) return;
        setCurrent(current === length - 1 ? 0 : current + 1);
    }, [current, length]);

    const prevSlide = () => {
        if (length === 0) return;
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    useEffect(() => {
        if (!isPaused && length > 0) {
            const timer = setInterval(nextSlide, 2500);
            return () => clearInterval(timer);
        }
    }, [nextSlide, isPaused, length]);

    const scrollToProducts = (e) => {
        if (e) e.stopPropagation();
        const element = document.getElementById('products');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (loading || offers.length === 0) {
        return null;
    }

    return (
        <>
            <section
                className="hero-carousel"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <button className="arrow left-arrow" onClick={prevSlide} aria-label="Previous Slide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button className="arrow right-arrow" onClick={nextSlide} aria-label="Next Slide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>

                {offers.map((slide, index) => (
                    <div
                        className={`${index === current ? 'slide active' : 'slide'}`}
                        key={slide._id || index}
                        onClick={() => slide.link ? navigate(slide.link) : scrollToProducts()}
                        style={{ cursor: 'pointer' }}
                    >
                        {/* Background Layer */}
                        <div
                            className="slide-background"
                            style={{
                                backgroundImage: `url(${getImageUrl(slide.image)})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <div className="overlay" />
                        </div>

                        {/* Content Layer */}
                        {index === current && (
                            <div className="container carousel-content full-banner-content">
                                <div className="carousel-text fade-in">
                                    {slide.title && <h1 className="serif">{slide.title}</h1>}
                                    {slide.description && <p className="offer-desc">{slide.description}</p>}
                                </div>
                            </div>
                        )}

                        {/* Slide Progress Bar */}
                        {index === current && (
                            <div className="slide-progress">
                                <div className="progress-fill" style={{ animationDuration: isPaused ? '0s' : '2.5s' }}></div>
                            </div>
                        )}
                    </div>
                ))}

                <div className="navigation-dots">
                    {offers.map((_, index) => (
                        <span
                            key={index}
                            className={index === current ? 'dot active' : 'dot'}
                            onClick={() => setCurrent(index)}
                        ></span>
                    ))}
                </div>
            </section>

        </>
    );
};

export default HeroCarousel;
