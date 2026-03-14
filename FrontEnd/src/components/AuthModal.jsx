import React, { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '../context/UserContext';
import logo from '../assets/logo/logo.png';
import './AuthModal.css';

const OTP_SERVER = 'http://localhost:4001/api';

const AuthModal = ({ isOpen, onClose, product }) => {
    const { login } = useContext(UserContext);
    const [step, setStep] = useState(2); // Start directly at input (Step 2)
    const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
    const [method, setMethod] = useState('mobile'); 
    const [inputValue, setInputValue] = useState('');
    const [userName, setUserName] = useState('');
    const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [user, setUserLocal] = useState(null);
    const otpRefs = useRef([]);

    // Check for existing session on mount and when modal opens
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUserLocal(JSON.parse(savedUser));
        }
    }, [isOpen]);

    // Reset state whenever modal opens
    useEffect(() => {
        if (isOpen) {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setStep(5); // 5 is "Logged In" state
                const parsed = JSON.parse(savedUser);
                setUserName(parsed.name || '');
                setUserLocal(parsed);
            } else {
                setStep(2);
                setInputValue('');
                setUserName('');
                setOtpDigits(['', '', '', '', '', '']);
                setAuthMode('login'); // Default to login on fresh open
            }
            setMethod('mobile');
            setError('');
            setLoading(false);
            setResendTimer(0);
        }
    }, [isOpen]);

    // Timer for resending OTP
    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => setResendTimer(t => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    if (!isOpen) return null;

    const logoutLocal = () => {
        localStorage.removeItem('user');
        setUserLocal(null);
        setStep(2);
        setUserName('');
        setInputValue('');
        setAuthMode('login');
    };

    const validate = () => {
        if (method === 'mobile') {
            if (!/^\d{10}$/.test(inputValue)) {
                setError('Please enter a valid 10-digit mobile number.');
                return false;
            }
        } else {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
                setError('Please enter a valid email address.');
                return false;
            }
        }
        
        // Name is only required in Register mode
        if (authMode === 'register' && !userName.trim()) {
            setError('Please enter your name for registration.');
            return false;
        }
        return true;
    };

    const sendOtp = async () => {
        setError('');
        if (!validate()) return;
        setLoading(true);

        try {
            const endpoint = method === 'mobile'
                ? `${OTP_SERVER}/send-otp/sms`
                : `${OTP_SERVER}/send-otp/email`;

            const body = method === 'mobile'
                ? { mobile: inputValue, name: authMode === 'register' ? userName : 'Customer' }
                : { email: inputValue, name: authMode === 'register' ? userName : 'Customer' };

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (data.success) {
                setStep(3);
                setResendTimer(30);
            } else {
                setError(data.message || 'Failed to send OTP. Please try again.');
            }
        } catch {
            setError('Cannot reach OTP server. Make sure the backend is running on port 4001.');
        } finally {
            setLoading(false);
        }
    };

    // ─── Actions ──────────────────────────────────────────────────────────────

    // 1. LOGIN
    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otpDigits];
        newOtp[index] = value.slice(-1);
        setOtpDigits(newOtp);

        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, 6).split('');
        const newOtp = [...otpDigits];
        pasteData.forEach((char, i) => {
            if (i < 6 && /^\d$/.test(char)) newOtp[i] = char;
        });
        setOtpDigits(newOtp);
        const nextFocus = Math.min(pasteData.length, 5);
        otpRefs.current[nextFocus]?.focus();
    };

    const handleVerifyOtp = async () => {
        const enteredOtp = otpDigits.join('');
        if (enteredOtp.length < 6) return setError('Please enter the 6-digit OTP.');
        
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${OTP_SERVER}/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: inputValue, otp: enteredOtp })
            });

            const data = await res.json();
            if (data.success) {
                const userData = { 
                    name: authMode === 'register' ? userName : (data.userName || 'Customer'), 
                    contact: inputValue, 
                    method 
                };
                login(userData);
                setUserLocal(userData);
                setStep(4);
            } else {
                setError(data.message || 'Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError('Connection error. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = () => {
        sendOtp();
    };

    const onAuthSuccess = (data) => {
        login({ 
            _id: data._id, 
            name: data.name, 
            contact: data.email,
            token: data.token 
        });
        setTimeout(() => onClose(), 1500);
    };

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('auth-modal-backdrop')) onClose();
    };

    // ─── Render View Helpers ──────────────────────────────────────────────────

    const renderHeader = (title) => (
        <div className="auth-modal-header" style={{ textAlign: 'center', marginBottom: '15px' }}>
            <div className="auth-modal-logo" style={{ marginBottom: '10px' }}>
                <img src={logo} alt="Sholash" width="100px" />
            </div>
            <h2 className="serif" style={{ fontSize: '24px', fontWeight: 'bold' }}>{title}</h2>
        </div>
    );

    const renderError = () => error && (
        <div className="auth-error-msg" style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '12px', borderRadius: '8px', color: '#b91c1c', marginBottom: '20px', fontSize: '13px', display: 'flex', gap: '8px' }}>
            <span>⚠️</span> {error}
        </div>
    );

    const renderSuccess = () => successMsg && (
        <div className="auth-success-body" style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>✅</div>
            <h3 className="serif">{successMsg}</h3>
        </div>
    );

    return (
        <div className="auth-modal-backdrop" onClick={handleBackdropClick}>
            <div className="auth-modal-card auth-modal-enter" style={{ maxWidth: '400px', padding: '30px' }}>
                <button className="auth-modal-close" onClick={onClose}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>

                {/* Header */}
                <div className="auth-modal-header">
                    <div className="auth-modal-logo">
                        <img src={logo} alt="Sholash Logo" className="auth-logo-img" />
                    </div>
                    <h2 className="serif auth-modal-title">
                        {step === 5 ? 'Welcome Back!' : step === 4 ? 'Welcome!' : step === 3 ? 'Verify OTP' : (authMode === 'register' ? 'Create Account' : 'Sign In')}
                    </h2>
                    <p className="auth-modal-subtitle">
                        {step === 5 && `You are currently logged in as ${userName}`}
                        {step === 2 && (authMode === 'register' ? 'Join Sholash Life Science today' : 'Access your account with ease')}
                        {step === 3 && `We sent a 6-digit OTP to ${inputValue}`}
                        {step === 4 && `You're logged in and ready to shop!`}
                    </p>
                </div>

                {/* Step 2 — Unified Input */}
                {(step === 1 || step === 2) && (
                    <div className="auth-modal-body">
                        {/* Login/Register Toggle */}
                        <div className="auth-mode-toggle">
                            <button 
                                className={`auth-mode-btn ${authMode === 'login' ? 'active' : ''}`}
                                onClick={() => { setAuthMode('login'); setError(''); }}
                            >
                                Login
                            </button>
                            <button 
                                className={`auth-mode-btn ${authMode === 'register' ? 'active' : ''}`}
                                onClick={() => { setAuthMode('register'); setError(''); }}
                            >
                                Register
                            </button>
                        </div>

                        <div className="auth-method-tabs">
                            <button
                                className={`auth-tab ${method === 'mobile' ? 'active' : ''}`}
                                onClick={() => { setMethod('mobile'); setError(''); }}
                            >
                                📱 Mobile
                            </button>
                            <button
                                className={`auth-tab ${method === 'email' ? 'active' : ''}`}
                                onClick={() => { setMethod('email'); setError(''); }}
                            >
                                ✉️ Email
                            </button>
                        </div>

                        {authMode === 'register' && (
                            <div className="auth-input-group auth-fade-in">
                                <label className="auth-label">Your Name</label>
                                <input
                                    className="auth-input"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={userName}
                                    onChange={e => { setUserName(e.target.value); setError(''); }}
                                    autoFocus
                                />
                            </div>
                        )}

                        <div className="auth-input-group">
                            <label className="auth-label">
                                {method === 'mobile' ? 'Mobile Number' : 'Email Address'}
                            </label>
                            <input
                                className="auth-input"
                                type={method === 'mobile' ? 'tel' : 'email'}
                                placeholder={method === 'mobile' ? '10-digit mobile number' : 'you@example.com'}
                                value={inputValue}
                                onChange={e => { setInputValue(e.target.value); setError(''); }}
                                maxLength={method === 'mobile' ? 10 : 100}
                                autoFocus={authMode === 'login'}
                            />
                        </div>
                        {error && <p className="auth-error">{error}</p>}
                        <button
                            className={`auth-btn-primary ${loading ? 'loading' : ''}`}
                            onClick={sendOtp}
                            disabled={loading}
                        >
                            {loading ? <span className="auth-spinner"></span> : (authMode === 'register' ? 'Register Now →' : 'Sign In →')}
                        </button>
                        
                        <p className="auth-mode-switch-text">
                            {authMode === 'login' 
                                ? "Don't have an account? " 
                                : "Already have an account? "}
                            <span 
                                className="auth-mode-link"
                                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                            >
                                {authMode === 'login' ? 'Register here' : 'Login here'}
                            </span>
                        </p>
                    </div>
                )}

                {/* Step 3 — OTP verification */}
                {step === 3 && (
                    <div className="auth-modal-body">
                        <div className="otp-boxes" onPaste={handleOtpPaste}>
                            {otpDigits.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={el => otpRefs.current[i] = el}
                                    className="otp-box"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={e => handleOtpChange(i, e.target.value)}
                                    onKeyDown={e => handleOtpKeyDown(i, e)}
                                    autoFocus={i === 0}
                                />
                            ))}
                        </div>
                        {error && <p className="auth-error">{error}</p>}
                        <button
                            className={`auth-btn-primary ${loading ? 'loading' : ''}`}
                            onClick={handleVerifyOtp}
                            disabled={loading}
                        >
                            {loading ? <span className="auth-spinner"></span> : 'Verify OTP ✓'}
                        </button>
                        <div className="auth-resend-row">
                            {resendTimer > 0
                                ? <span className="auth-timer">Resend OTP in {resendTimer}s</span>
                                : <button className="auth-btn-resend" onClick={handleResend}>Resend OTP</button>
                            }
                        </div>
                        <button className="auth-btn-back" onClick={() => { setStep(2); setError(''); setOtpDigits(['', '', '', '', '', '']); }}>
                            ← Change {method === 'mobile' ? 'Number' : 'Email'}
                        </button>
                    </div>
                )}

                {/* Step 4 — Success */}
                {step === 4 && (
                    <div className="auth-modal-body auth-success-body">
                        <div className="auth-success-icon">✅</div>
                        <h3 className="auth-success-name">Hello, {userName}! 👋</h3>
                        <p className="auth-success-msg">
                            Your account has been verified. You can now proceed to purchase <strong>{product?.name || 'your product'}</strong>.
                        </p>
                        <button className="auth-btn-primary auth-btn-shop" onClick={onClose}>
                            Continue Shopping 🛍️
                        </button>
                    </div>
                )}

                {/* Step 5 — Already Logged In */}
                {step === 5 && (
                    <div className="auth-modal-body auth-success-body">
                        <div className="auth-success-icon">👤</div>
                        <h3 className="auth-success-name">Hi, {userName}!</h3>
                        <p className="auth-success-msg">
                            You are signed in with <strong>{user?.contact}</strong>.
                        </p>
                        <button className="auth-btn-primary" onClick={onClose}>
                            Continue Shopping 🛍️
                        </button>
                        <button className="auth-btn-logout" onClick={logoutLocal}>
                            Log Out
                        </button>
                    </div>
                )}

                {/* Step indicator dots */}
                <div className="auth-step-dots">
                    {[2, 3, 4].map(s => (
                        <span key={s} className={`auth-dot ${step >= s ? 'active' : ''} ${step === s ? 'current' : ''}`}></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
