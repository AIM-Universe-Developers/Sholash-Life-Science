import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Header.css';
import logo from '../assets/logo/logo.png';

const Header = ({ cartCount, searchQuery, setSearchQuery, onAuthClick }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useContext(UserContext);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        // If query is empty, do nothing
        if (!searchQuery.trim()) return;

        // If not on home page, navigate to home and then hash
        if (location.pathname !== '/') {
            navigate('/#products');
            // After navigation, we might need a slight delay or rely on the hash
            setTimeout(() => {
                const element = document.getElementById('products');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            // Already on home, just scroll to products
            const element = document.getElementById('products');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <header className={`header glass fade-in ${scrolled ? 'scrolled' : ''}`}>
            <div className="container header-content">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Sholash Life Sciences" className="logo-img" />
                    </Link>
                </div>
                <nav className="nav">
                    <Link to="/">Home</Link>
                    <a href="/#products">Collection</a>
                    <Link to="/about">Our Story</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
                <div className="header-actions">
                    <form className="search-container" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="icon-btn search-btn" aria-label="Search">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </button>
                    </form>
                    {user ? (
                        <Link to="/profile" className="account-user" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                            <div className="icon-btn account-btn" aria-label="My Profile" style={{ background: '#f5f5f5', color: '#000' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </div>
                            <span className="account-text" style={{ fontWeight: 'bold' }}>{user.name?.split(' ')[0] || 'Profile'}</span>
                        </Link>
                    ) : (
                        <button className="icon-btn account-btn" onClick={onAuthClick} aria-label="Account">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            <span className="account-text">Account</span>
                        </button>
                    )}
                    <Link to="/cart" className="icon-btn cart-btn" aria-label="Cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        <span className="cart-text">Cart</span>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
