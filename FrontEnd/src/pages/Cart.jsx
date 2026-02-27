import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, onUpdateQuantity, onRemoveFromCart }) => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="cart-page fade-in">
            <div className="container">
                <header className="cart-header">
                    <h1 className="serif">Your Shopping Cart</h1>
                    <p className="subtitle">{cartCount} {cartCount === 1 ? 'Item' : 'Items'}</p>
                </header>

                {cart.length === 0 ? (
                    <div className="empty-cart glass">
                        <div className="empty-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        </div>
                        <h3>Your cart is empty</h3>
                        <p>Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/" className="btn-primary">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items-list">
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item glass fade-in">
                                    <div className="item-image" style={{ backgroundColor: item.color || '#f0f0f0' }}>
                                        <div className="item-silhouette"></div>
                                    </div>
                                    <div className="item-details">
                                        <span className="item-category">{item.category}</span>
                                        <h3 className="serif">{item.name}</h3>
                                        <div className="item-price">₹{item.price}</div>
                                    </div>
                                    <div className="item-actions">
                                        <div className="cart-quantity-selector">
                                            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                        <button className="btn-remove" onClick={() => onRemoveFromCart(item.id)}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <aside className="cart-summary glass sticky">
                            <h2 className="serif">Order Summary</h2>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{total}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span className="free">FREE</span>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>
                            <button className="btn-checkout">Proceed to Checkout</button>
                            <Link to="/" className="continue-shopping">Continue Shopping</Link>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
