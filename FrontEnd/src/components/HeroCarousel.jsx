import React, { useState, useEffect, useCallback } from 'react';
import './HeroCarousel.css';

import img1 from '../assets/images/Acnevor.png';
import img2 from '../assets/images/Moisturizing lotion.png';
import img3 from '../assets/images/clindamycin gel.png';
import img4 from '../assets/images/glazzium.png';
import img5 from '../assets/images/seriaFree.png';
import img6 from '../assets/images/sunscreen.png';
import img7 from '../assets/images/tablets.png';

const marqueeImages = [img1, img2, img3, img4, img5, img6, img7];

const offers = [
    {
        id: 1,
        title: "Brightening Serum for Indian Skin",
        desc: "Flat 20% OFF",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1200",
        btn: "Shop Now",
        color: "#e6f2ed"
    },
    {
        id: 2,
        title: "Goat Milk Shampoo",
        desc: "Use code HURRY20",
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=1200",
        btn: "Try Now",
        color: "#f5eceb"
    },
    {
        id: 3,
        title: "Natural Face Wash",
        desc: "Buy 1 Get 1 Free",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d538?auto=format&fit=crop&q=80&w=1200",
        btn: "Explore",
        color: "#eef5f1"
    }
];

const HeroCarousel = () => {
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
                        className={index === current ? 'slide active' : 'slide'}
                        key={slide.id}
                        style={{ backgroundColor: slide.color }}
                    >
                        {index === current && (
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
