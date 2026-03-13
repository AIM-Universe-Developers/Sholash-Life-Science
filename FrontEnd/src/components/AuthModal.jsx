import React, { useState, useEffect, useRef } from 'react';
import './AuthModal.css';

const OTP_SERVER = 'http://localhost:4001/api';

const AuthModal = ({ isOpen, onClose, product }) => {
    const [step, setStep] = useState(1); // 1: method, 2: input, 3: otp, 4: success
    const [method, setMethod] = useState('mobile'); // 'mobile' | 'email'
    const [inputValue, setInputValue] = useState('');
    const [userName, setUserName] = useState('');
    const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const otpRefs = useRef([]);

    // Reset state whenever modal opens
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setMethod('mobile');
            setInputValue('');
            setUserName('');
            setOtpDigits(['', '', '', '', '', '']);
            setError('');
            setLoading(false);
            setResendTimer(0);
        }
    }, [isOpen]);

    // Resend countdown timer
    useEffect(() => {
        if (resendTimer > 0) {
            const t = setTimeout(() => setResendTimer(r => r - 1), 1000);
            return () => clearTimeout(t);
        }
    }, [resendTimer]);

    if (!isOpen) return null;

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
        if (!userName.trim()) {
            setError('Please enter your name.');
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
                ? { mobile: inputValue, name: userName }
                : { email: inputValue, name: userName };

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
        } catch (err) {
            console.error('OTP Send Error:', err);
            setError('Cannot reach OTP server. Make sure the OTP server is running on port 4001.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const newDigits = [...otpDigits];
        newDigits[index] = value;
        setOtpDigits(newDigits);
        setError('');
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
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newDigits = [...otpDigits];
        pasted.split('').forEach((ch, i) => { newDigits[i] = ch; });
        setOtpDigits(newDigits);
        otpRefs.current[Math.min(pasted.length, 5)]?.focus();
    };

    const handleVerifyOtp = async () => {
        const enteredOtp = otpDigits.join('');
        if (enteredOtp.length < 6) {
            setError('Please enter all 6 digits of the OTP.');
            return;
        }
        setLoading(true);

        try {
            const key = method === 'mobile' ? inputValue : inputValue;
            const res = await fetch(`${OTP_SERVER}/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, otp: enteredOtp })
            });

            const data = await res.json();

            if (data.success) {
                setStep(4);
            } else {
                setError(data.message || 'Invalid OTP. Please try again.');
                setOtpDigits(['', '', '', '', '', '']);
                otpRefs.current[0]?.focus();
            }
        } catch (err) {
            console.error('OTP Verify Error:', err);
            setError('Cannot reach OTP server. Make sure the OTP server is running on port 4001.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = () => {
        if (resendTimer > 0) return;
        setOtpDigits(['', '', '', '', '', '']);
        setError('');
        sendOtp();
    };

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('auth-modal-backdrop')) onClose();
    };

    return (
        <div className="auth-modal-backdrop" onClick={handleBackdropClick}>
            <div className={`auth-modal-card ${isOpen ? 'auth-modal-enter' : ''}`} role="dialog" aria-modal="true">
                {/* Close button */}
                <button className="auth-modal-close" onClick={onClose} aria-label="Close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>

                {/* Header */}
                <div className="auth-modal-header">
                    <div className="auth-modal-logo"><img src="assets/logo.2.png" alt="Sholash Logo" width="100px" height="100px" /></div>
                    <h2 className="serif auth-modal-title">
                        {step === 4 ? 'Welcome!' : step === 3 ? 'Verify OTP' : 'Sign In / Register'}
                    </h2>
                    <p className="auth-modal-subtitle">
                        {step === 1 && 'Choose how you want to continue'}
                        {step === 2 && `Enter your ${method === 'mobile' ? 'mobile number' : 'email address'}`}
                        {step === 3 && `We sent a 6-digit OTP to ${inputValue}`}
                        {step === 4 && `You're logged in and ready to shop!`}
                    </p>
                </div>

                {/* Step 1 — Choose method */}
                {step === 1 && (
                    <div className="auth-modal-body">
                        <div className="auth-method-tabs">
                            <button
                                className={`auth-tab ${method === 'mobile' ? 'active' : ''}`}
                                onClick={() => setMethod('mobile')}
                            >
                                📱 Mobile Number
                            </button>
                            <button
                                className={`auth-tab ${method === 'email' ? 'active' : ''}`}
                                onClick={() => setMethod('email')}
                            >
                                ✉️ Email Address
                            </button>
                        </div>
                        <div className="auth-method-desc">
                            {method === 'mobile'
                                ? 'We will send a one-time password (OTP) via SMS to your mobile number.'
                                : 'We will send a one-time password (OTP) to your email inbox.'}
                        </div>
                        <button className="auth-btn-primary" onClick={() => setStep(2)}>
                            Continue with {method === 'mobile' ? 'Mobile' : 'Email'} →
                        </button>
                    </div>
                )}

                {/* Step 2 — Input details */}
                {step === 2 && (
                    <div className="auth-modal-body">
                        <div className="auth-input-group">
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
                            />
                        </div>
                        {error && <p className="auth-error">{error}</p>}
                        <button
                            className={`auth-btn-primary ${loading ? 'loading' : ''}`}
                            onClick={sendOtp}
                            disabled={loading}
                        >
                            {loading ? <span className="auth-spinner"></span> : `Send OTP →`}
                        </button>
                        <button className="auth-btn-back" onClick={() => { setStep(1); setError(''); }}>
                            ← Back
                        </button>
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

                {/* Step indicator dots */}
                <div className="auth-step-dots">
                    {[1, 2, 3, 4].map(s => (
                        <span key={s} className={`auth-dot ${step >= s ? 'active' : ''} ${step === s ? 'current' : ''}`}></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
