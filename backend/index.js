import dotenv from 'dotenv';
dotenv.config();

console.log('GOOGLE_CLIENT_ID (index):', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET (index):', process.env.GOOGLE_CLIENT_SECRET);

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/auth.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

// Dynamically import the Passport config AFTER dotenv loaded
(async () => {
  await import('./config/passport.js');

  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

  app.use('/api/auth', authRoutes);

  app.get('/', (req, res) => res.send('API Running'));

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
