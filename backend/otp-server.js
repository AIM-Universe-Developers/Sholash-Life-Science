require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const axios = require('axios');
const dns = require('dns');

// Force IPv4 as the default for all network calls
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}

const app = express();
const PORT = process.env.OTP_PORT || 4000;

console.log("EMAIL:", process.env.GMAIL_USER);
console.log("PASS:", process.env.GMAIL_APP_PASSWORD);

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }));
app.use(express.json());

// ─── In-memory OTP store (key → { otp, expiresAt }) ──────
const otpStore = new Map();
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
const saveOtp = (key, otp) => {
    otpStore.set(key, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // 5 min
};

// ─── Check if Gmail credentials are real (not placeholders) ──
const isGmailConfigured = () =>
    process.env.GMAIL_USER &&
    process.env.GMAIL_USER !== 'your_email@gmail.com' &&
    process.env.GMAIL_APP_PASSWORD &&
    process.env.GMAIL_APP_PASSWORD !== 'your_16_char_app_password';

const isFast2SMSConfigured = () =>
    process.env.FAST2SMS_API_KEY &&
    process.env.FAST2SMS_API_KEY !== 'your_fast2sms_api_key';

// ─── Nodemailer transporter (Gmail SMTP) ──────────────────
const createTransporter = () => nodemailer.createTransport({
    service: 'gmail', // This automatically sets host/port/secure
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    },
    tls: { 
        rejectUnauthorized: false,
        family: 4 // Ensure TLS tries IPv4
    },
    family: 4, // Force IPv4 globally for this transporter
    connectionTimeout: 10000, 
    greetingTimeout: 10000,
    pool: true,
    maxConnections: 3,
    debug: true,
    logger: true
});

// ─── Email OTP ────────────────────────────────────────────
app.post('/api/send-otp/email', async (req, res) => {
    const { email, name } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    const otp = generateOtp();
    saveOtp(email, otp);

    // ── DEV MODE: credentials not configured, return OTP in response ──
    if (!isGmailConfigured()) {
        console.log(`[DEV MODE] Email OTP for ${email}: ${otp}`);
        return res.json({
            success: true,
            devMode: true,
            message: `[DEV] Gmail not configured. Your OTP is: ${otp}`,
            otp   // sent to frontend in dev mode only
        });
    }

    try {
        const transporter = createTransporter();
        await transporter.sendMail({
            from: `"Sholash Life Science" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: `Your OTP for Sholash — ${otp}`,
            html: `
            <div style="font-family:'Segoe UI',sans-serif;max-width:480px;margin:auto;background:#f0fdfa;border-radius:16px;padding:32px;border:1px solid #a7f3d0;">
                <div style="text-align:center;margin-bottom:24px;">
                <span style="font-size:40px;">🌿</span>
                <h2 style="color:#065f46;margin:8px 0 0;">Sholash Life Science</h2>
                </div>
                <p style="color:#374151;">Hi <strong>${name || 'there'}</strong>,</p>
                <p style="color:#374151;">Your One-Time Password (OTP) is:</p>
                <div style="text-align:center;margin:24px 0;">
                <span style="font-size:42px;font-weight:800;letter-spacing:12px;color:#047857;background:#d1fae5;padding:16px 24px;border-radius:12px;display:inline-block;">${otp}</span>
                </div>
                <p style="color:#6b7280;font-size:13px;">Valid for <strong>5 minutes</strong>. Do not share with anyone.</p>
                <hr style="border:none;border-top:1px solid #d1fae5;margin:24px 0;">
                <p style="color:#9ca3af;font-size:12px;text-align:center;">© 2025 Sholash Life Science</p>
            </div>`
        });
        console.log(`[OTP] Email sent to ${email}`);
        res.json({ success: true, message: 'OTP sent to your email.' });

    } catch (err) {
        console.error('[Email Error]', err.message);

        let hint = err.message; // Use real error message as the hint
        if (err.message.includes('535') || err.message.includes('Username and Password')) {
            hint = 'Gmail rejected the password. Use an App Password (not your normal Gmail password).';
        } else if (err.message.includes('ECONNREFUSED')) {
            hint = 'Cannot connect to Gmail SMTP.';
        }

        res.status(500).json({
            success: false,
            message: `Email failed: ${hint}`
        });
    }
});

// ─── SMS OTP (Fast2SMS) ───────────────────────────────────
app.post('/api/send-otp/sms', async (req, res) => {
    const { mobile } = req.body;

    if (!mobile || !/^\d{10}$/.test(mobile)) {
        return res.status(400).json({ success: false, message: 'Enter a valid 10-digit mobile number.' });
    }

    const otp = generateOtp();
    saveOtp(mobile, otp);

    // ── DEV MODE ─────────────────────────────
    if (!isFast2SMSConfigured()) {
        console.log(`[DEV MODE] SMS OTP for ${mobile}: ${otp}`);
        return res.json({
            success: true,
            devMode: true,
            message: `[DEV] Fast2SMS not configured. Your OTP is: ${otp}`,
            otp
        });
    }

    try {
        const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
            params: {
                authorization: process.env.FAST2SMS_API_KEY,
                variables_values: otp,
                route: 'otp',
                numbers: mobile
            },
            headers: { 'cache-control': 'no-cache' },
            timeout: 10000
        });

        if (response.data.return === true) {
            console.log(`[OTP] SMS sent to ${mobile}: ${otp}`);
            res.json({ success: true, message: 'OTP sent via SMS.' });
        } else {
            console.error('[Fast2SMS]', response.data);
            res.status(500).json({ success: false, message: response.data.message || 'Fast2SMS rejected the request.' });
        }
    } catch (err) {
        console.error('[SMS Error]', err.message);
        res.status(500).json({ success: false, message: 'SMS delivery failed. Check your Fast2SMS API key in .env.' });
    }
});

// ─── Verify OTP ───────────────────────────────────────────
app.post('/api/verify-otp', (req, res) => {
    const { key, otp } = req.body;
    if (!key || !otp) return res.status(400).json({ success: false, message: 'Missing key or OTP.' });

    const record = otpStore.get(key);
    if (!record) return res.status(400).json({ success: false, message: 'No OTP found. Please request a new one.' });
    if (Date.now() > record.expiresAt) {
        otpStore.delete(key);
        return res.status(400).json({ success: false, message: 'OTP expired. Please request a new one.' });
    }
    if (record.otp !== otp.trim()) {
        return res.status(400).json({ success: false, message: 'Incorrect OTP. Please try again.' });
    }

    otpStore.delete(key);
    res.json({ success: true, message: 'OTP verified.' });
});

// ─── Health check ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        email: isGmailConfigured() ? 'configured' : 'dev-mode',
        sms: isFast2SMSConfigured() ? 'configured' : 'dev-mode'
    });
});

app.listen(PORT, () => {
    console.log(`\n✅ Sholash OTP Server running on http://localhost:${PORT}`);
    console.log(`   Email: ${isGmailConfigured() ? '✓ Gmail configured — real emails will be sent' : '⚠  DEV MODE — OTP will be shown in modal (fill .env to send real emails)'}`);
    console.log(`   SMS:   ${isFast2SMSConfigured() ? '✓ Fast2SMS configured — real SMS will be sent' : '⚠  DEV MODE — OTP will be shown in modal (fill .env to send real SMS)\n'}`);
});
