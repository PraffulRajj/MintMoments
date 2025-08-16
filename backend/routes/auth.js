import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

function createToken(user) {
  return jwt.sign({ id: user._id }, process.env.SESSION_SECRET, { expiresIn: '1d' });
}

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed });
  await user.save();

  const token = createToken(user);
  res.cookie('token', token, { httpOnly: true, sameSite: "none", secure: true, maxAge: 86400000 });
  res.json({ user: { email: user.email } });
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) return res.status(401).json({ message: info?.message || 'Login failed' });

    const token = createToken(user);
    res.cookie('token', token, { httpOnly: true, sameSite: "none", secure: true, maxAge: 86400000 });
    res.json({ user: { email: user.email } });
  })(req, res, next);
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: "none", secure: true });
  res.json({ message: 'Logged out' });
});

// Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    const token = createToken(req.user);
    res.cookie('token', token, { httpOnly: true, sameSite: "none", secure: true, maxAge: 86400000 });

    // Redirect based on environment
    const frontendUrl =
      process.env.NODE_ENV === "production"
        ? "https://mintmoments.netlify.app/dashboard"
        : "http://localhost:5173/dashboard";

    res.redirect(frontendUrl);
  }
);

// ✅ Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ user: null });

    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    const user = await User.findById(decoded.id).select("email displayName");

    if (!user) return res.status(404).json({ user: null });

    res.json({ user });
  } catch (err) {
    console.error("Error in /me:", err);
    res.status(401).json({ user: null });
  }
});

export default router;
