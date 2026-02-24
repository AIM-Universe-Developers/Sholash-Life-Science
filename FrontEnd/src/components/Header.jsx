import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header glass fade-in">
            <div className="container header-content">
                <div className="logo serif">SHOLASH</div>
                <nav className="nav">
                    <a href="#home">Home</a>
                    <a href="#products">Collection</a>
                    <a href="#about">Our Story</a>
                    <a href="#contact">Contact</a>
                </nav>
                <div className="header-actions">
                    <button className="icon-btn" aria-label="Search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                    <button className="icon-btn" aria-label="Cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
