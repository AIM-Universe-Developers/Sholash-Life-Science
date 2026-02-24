import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer fade-in">
            <div className="container footer-content">
                <div className="footer-brand">
                    <div className="logo serif">SHOLASH</div>
                    <p>Scientific skincare for your natural radiance. Dermatologist tested, results driven.</p>
                </div>
                <div className="footer-links">
                    <div className="link-group">
                        <h4>Shop</h4>
                        <a href="#">Sunscreen</a>
                        <a href="#">Moisturizers</a>
                        <a href="#">Cleansers</a>
                        <a href="#">Treatments</a>
                    </div>
                    <div className="link-group">
                        <h4>Support</h4>
                        <a href="#">Shipping</a>
                        <a href="#">Returns</a>
                        <a href="#">Contact Us</a>
                        <a href="#">FAQ</a>
                    </div>
                    <div className="link-group">
                        <h4>Newsletter</h4>
                        <p>Join our luminous community for skin tips and early access.</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Your email" />
                            <button type="submit">Join</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; 2026 SHOLASH Skincare. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
