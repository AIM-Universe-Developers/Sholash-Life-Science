import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroCarousel.css';

import img1 from '../assets/IMG CART/p1.jpeg';
import img2 from '../assets/IMG CART/p2.jpeg';
import img3 from '../assets/IMG CART/p3.jpeg';
import img4 from '../assets/IMG CART/p4.jpeg';
import img5 from '../assets/IMG CART/p5.jpeg';
import img6 from '../assets/IMG CART/p6.jpeg';
import img7 from '../assets/IMG CART/p7.jpeg';
import heroBanner from '../assets/PRODUCT HOME IMAGE/herocard 2.png';

const marqueeImages = [img1, img2, img3, img4, img5, img6, img7];

const offers = [
    {
        id: 0,
        title: "Limited Edition Collection",
        desc: "Special Launch Offer",
        image: heroBanner,
        btn: "Discover Now",
        color: "#f8f9fa",
        isFullImage: true,
        link: "/product/2"
    },
    {
        id: 1,
        title: "Brightening Serum for Indian Skin",
        desc: "Flat 20% OFF",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1200",
        btn: "Shop Now",
        color: "#dcbceaff"
    },
    {
        id: 2,
        title: "Goat Milk Shampoo",
        desc: "Use code HURRY20",
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=1200",
        btn: "Try Now",
        color: "#93a9baff"
    },
    {
        id: 3,
        title: "Natural Face Wash",
        desc: "Buy 1 Get 1 Free",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d538?auto=format&fit=crop&q=80&w=1200",
        btn: "Explore",
        color: "#a79484ff"
    }


];

const HeroCarousel = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const length = offers.length;

    const nextSlide = useCallback(() => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }, [current, length]);

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    useEffect(() => {
        if (!isPaused) {
            const timer = setInterval(nextSlide, 2500);
            return () => clearInterval(timer);
        }
    }, [nextSlide, isPaused]);

    if (!Array.isArray(offers) || offers.length <= 0) {
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
                        className={`${index === current ? 'slide active' : 'slide'} ${slide.isFullImage ? 'full-image' : ''}`}
                        key={slide.id}
                        style={{ backgroundColor: slide.color }}
                        onClick={() => slide.link && navigate(slide.link)}
                    >
                        {index === current && (
                            slide.isFullImage ? (
                                <div className="full-banner-wrapper">
                                    <img src={slide.image} alt={slide.title} className="full-banner-img" />
                                </div>
                            ) : (
                                <div className="container carousel-content">
                                    <div className="carousel-text fade-in">
                                        <h1 className="serif">{slide.title}</h1>
                                        <p className="offer-desc">{slide.desc}</p>
                                        <button className="btn-carousel">{slide.btn}</button>
                                    </div>
                                    <div className="carousel-image fade-in">
                                        <div className="image-wrapper glass">
                                            <img src={slide.image} alt={slide.title} />
                                        </div>
                                    </div>
                                </div>
                            )
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

            <div className="image-marquee-container">
                <div className="image-marquee">
                    {[...marqueeImages, ...marqueeImages].map((img, index) => (
                        <div key={index} className="marquee-item">
                            <img src={img} alt={`Product ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HeroCarousel;
