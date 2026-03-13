import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import logo from '../assets/logo/logo.png';
import './AuthModal.css';

const API_URL = 'http://localhost:5000/api/users';

const AuthModal = ({ isOpen, onClose, product }) => {
    // ─── View Views ───────────────────────────────────────────────────────────
    // 'LOGIN', 'REGISTER', 'VERIFY_REG', 'FORGOT_EMAIL', 'FORGOT_RESET'
    const [view, setView] = useState('LOGIN');
    
    // ─── Form State ───────────────────────────────────────────────────────────
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    // ─── UI State ─────────────────────────────────────────────────────────────
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [timer, setTimer] = useState(0);

    const { login } = useContext(UserContext);

    // Reset everything when modal opens
    useEffect(() => {
        if (isOpen) {
            setView('LOGIN');
            resetForms();
        }
    }, [isOpen]);

    // Timer for resending OTP
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer(t => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    if (!isOpen) return null;

    const resetForms = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setOtp('');
        setNewPassword('');
        setError('');
        setSuccessMsg('');
        setLoading(false);
    };

    // ─── Actions ──────────────────────────────────────────────────────────────

    // 1. LOGIN
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) return setError('Please enter both email and password.');
        
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success) {
                onAuthSuccess(data);
            } else {
                setError(data.message || 'Invalid email or password.');
            }
        } catch (err) {
            setError('Server connection error.');
        } finally {
            setLoading(false);
        }
    };

    // 2. REQUEST REGISTRATION (Send OTP)
    const handleRequestRegister = async (e) => {
        e.preventDefault();
        setError('');
        if (!name || !email || !password) return setError('All fields are required.');
        if (password !== confirmPassword) return setError('Passwords do not match.');
        if (password.length < 6) return setError('Password must be at least 6 characters.');

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/request-register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email })
            });
            const data = await res.json();
            if (data.success) {
                setView('VERIFY_REG');
                setTimer(30);
            } else {
                setError(data.message || 'Failed to send verification code.');
            }
        } catch (err) {
            setError('Server connection error.');
        } finally {
            setLoading(false);
        }
    };

    // 3. COMPLETE REGISTRATION (Verify OTP)
    const handleVerifyRegister = async (e) => {
        e.preventDefault();
        setError('');
        if (!otp) return setError('Please enter the OTP sent to your email.');

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, otp })
            });
            const data = await res.json();
            if (data.success) {
                setSuccessMsg('Account created successfully!');
                onAuthSuccess(data);
            } else {
                setError(data.message || 'Verification failed.');
            }
        } catch (err) {
            setError('Server connection error.');
        } finally {
            setLoading(false);
        }
    };

    // 4. FORGOT PASSWORD - REQUEST RESET
    const handleRequestReset = async (e) => {
        e.preventDefault();
        setError('');
        if (!email) return setError('Please enter your email.');

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (data.success) {
                setView('FORGOT_RESET');
                setTimer(30);
            } else {
                setError(data.message || 'User not found.');
            }
        } catch (err) {
            setError('Server connection error.');
        } finally {
            setLoading(false);
        }
    };

    // 5. COMPLETE PASSWORD RESET
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        if (!otp || !newPassword) return setError('Please enter OTP and new password.');
        if (newPassword !== confirmPassword) return setError('Passwords do not match.');
        if (newPassword.length < 6) return setError('Password must be at least 6 characters.');

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword })
            });
            const data = await res.json();
            if (data.success) {
                setSuccessMsg('Password reset successful! Please sign in.');
                setTimeout(() => {
                    resetForms();
                    setView('LOGIN');
                }, 2000);
            } else {
                setError(data.message || 'Reset failed.');
            }
        } catch (err) {
            setError('Server connection error.');
        } finally {
            setLoading(false);
        }
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

                {successMsg ? renderSuccess() : (
                    <>
                        {/* ─── 1. LOGIN VIEW ────────────────────────────────────── */}
                        {view === 'LOGIN' && (
                            <>
                                {renderHeader('Sign in')}
                                {renderError()}
                                <form onSubmit={handleLogin} className="auth-form">
                                    <div className="auth-input-group">
                                        <label>Email</label>
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
                                    </div>
                                    <div className="auth-input-group">
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <label>Password</label>
                                            <button type="button" onClick={() => setView('FORGOT_EMAIL')} style={{ background: 'none', border: 'none', color: '#047857', fontSize: '12px', cursor: 'pointer' }}>Forgot Password?</button>
                                        </div>
                                        <div style={{ position: 'relative' }}>
                                            <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="eye-btn">{showPassword ? '👁️‍🗨️' : '👁️'}</button>
                                        </div>
                                    </div>
                                    <button type="submit" className="auth-btn-primary" disabled={loading}>
                                        {loading ? <span className="auth-spinner" /> : 'Sign in'}
                                    </button>
                                </form>
                                <div className="auth-footer-divider">New to Sholash?</div>
                                <button className="auth-btn-sec" onClick={() => setView('REGISTER')}>Create your account</button>
                            </>
                        )}

                        {/* ─── 2. REGISTER VIEW ─────────────────────────────────── */}
                        {view === 'REGISTER' && (
                            <>
                                {renderHeader('Create account')}
                                {renderError()}
                                <form onSubmit={handleRequestRegister} className="auth-form">
                                    <div className="auth-input-group"><label>Your name</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="First and last name" /></div>
                                    <div className="auth-input-group"><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
                                    <div className="auth-input-group"><label>Password</label><input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" /></div>
                                    <div className="auth-input-group"><label>Re-enter password</label><input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /></div>
                                    <button type="submit" className="auth-btn-primary" disabled={loading}>{loading ? <span className="auth-spinner" /> : 'Continue'}</button>
                                </form>
                                <div className="auth-footer-text">Already have an account? <button onClick={() => setView('LOGIN')}>Sign in →</button></div>
                            </>
                        )}

                        {/* ─── 3. VERIFY REGISTRATION ──────────────────────────── */}
                        {view === 'VERIFY_REG' && (
                            <>
                                {renderHeader('Verify email')}
                                {renderError()}
                                <p style={{ fontSize: '13px', color: '#555', marginBottom: '20px' }}>To verify your email, we've sent a One Time Password (OTP) to <b>{email}</b>. (Please check your inbox or spam folder)</p>
                                <form onSubmit={handleVerifyRegister} className="auth-form">
                                    <div className="auth-input-group"><label>Enter OTP</label><input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="6-digit code" maxLength="6" /></div>
                                    <button type="submit" className="auth-btn-primary" disabled={loading}>{loading ? <span className="auth-spinner" /> : 'Create Account'}</button>
                                </form>
                                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                                    {timer > 0 ? <span style={{ fontSize: '12px', color: '#666' }}>Resend OTP in {timer}s</span> : 
                                    <button onClick={handleRequestRegister} style={{ background: 'none', border: 'none', color: '#047857', cursor: 'pointer', fontSize: '13px' }}>Resend OTP</button>}
                                </div>
                            </>
                        )}

                        {/* ─── 4. FORGOT PASSWORD - EMAIL ──────────────────────── */}
                        {view === 'FORGOT_EMAIL' && (
                            <>
                                {renderHeader('Password assistance')}
                                {renderError()}
                                <p style={{ fontSize: '13px', color: '#555', marginBottom: '20px' }}>Enter the email address associated with your Sholash account.</p>
                                <form onSubmit={handleRequestReset} className="auth-form">
                                    <div className="auth-input-group"><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
                                    <button type="submit" className="auth-btn-primary" disabled={loading}>{loading ? <span className="auth-spinner" /> : 'Continue'}</button>
                                </form>
                                <button className="auth-btn-back" onClick={() => setView('LOGIN')}>Back to Sign in</button>
                            </>
                        )}

                        {/* ─── 5. FORGOT PASSWORD - RESET ─────────────────────── */}
                        {view === 'FORGOT_RESET' && (
                            <>
                                {renderHeader('Reset password')}
                                {renderError()}
                                <p style={{ fontSize: '13px', color: '#555', marginBottom: '15px' }}>Enter the OTP sent to <b>{email}</b> and your new password.</p>
                                <form onSubmit={handleResetPassword} className="auth-form">
                                    <div className="auth-input-group"><label>OTP</label><input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="6-digit code" /></div>
                                    <div className="auth-input-group"><label>New Password</label><input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} /></div>
                                    <div className="auth-input-group"><label>Confirm New Password</label><input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /></div>
                                    <button type="submit" className="auth-btn-primary" disabled={loading}>{loading ? <span className="auth-spinner" /> : 'Save and Sign in'}</button>
                                </form>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
