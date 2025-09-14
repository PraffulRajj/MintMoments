import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Ticket } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

const quotes = [
  {
    text: 'Innovation starts with a single ticket.',
    img: 'https://cometogether.network/wp-content/uploads/2022/12/1-7.png',
  },
  {
    text: 'Build for impact.',
    img: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*g37CYwOky7vRU9Es9uOrdg.jpeg',
  },
  {
    text: 'Set up your digital wallet',
    img: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*hzfQBtJCaVDEJzp959rdnA.jpeg',
  },
];

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch {
      setError('Failed to sign in with Google.');
    } finally {
      setLoading(false);
    }
  }

  const mintGreen = '#98FF98';
  const paleSpringBud = '#b6f1c4';

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-8"
      style={{
        backgroundImage:
          "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwNDgtYmFja2dyb3VuZC0wMi5qcGc.jpg')",
      }}
    >
      <div className="max-w-5xl w-full bg-white/5 backdrop-blur-md rounded-3xl shadow-xl flex overflow-hidden flex-col md:flex-row md:gap-12">
        {/* Left Image + Quote */}
        <div
          className="w-full md:w-1/3 relative overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none p-4"
          style={{ minHeight: '320px', maxHeight: '320px' }}
        >
          <img
            src={quotes[quoteIndex].img}
            alt="Hackathon theme"
            className="absolute inset-0 w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center p-6 text-white rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            <p
              className="text-base font-semibold text-center max-w-xs md:max-w-sm italic"
              style={{
                fontStyle: 'italic',
                fontSize: '1.1rem',
                color: 'white',
                textShadow:
                  '0px 0px 10px rgba(255, 255, 255, 0.9), 0px 0px 20px rgba(255, 255, 255, 0.7)',
              }}
            >
              &quot;{quotes[quoteIndex].text}&quot;
            </p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-white/30 my-8"></div>

        {/* Login Form */}
        <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <Ticket className="h-10 w-10 text-accent" />
            </div>
            <h2
              className="text-3xl font-bold"
              style={{
                color: mintGreen,
                textShadow:
                  '0px 0px 8px rgba(0, 255, 0, 0.6), 0px 0px 20px rgba(0, 255, 0, 0.4)',
              }}
            >
              Welcome Back
            </h2>
            <p
              className="text-sm mt-2"
              style={{
                color: paleSpringBud,
                textShadow: '0px 0px 8px rgba(255, 255, 255, 0.6)',
              }}
            >
              Sign in to your MintMoments account
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-white">
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5" style={{ color: paleSpringBud }} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 rounded-lg bg-white/90 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Email address"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5" style={{ color: paleSpringBud }} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 rounded-lg bg-white/90 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded-lg bg-accent text-white font-semibold hover:bg-accent-dark transition disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 flex items-center">
              <div className="flex-grow border-t border-white/30"></div>
              <span className="px-4 text-sm" style={{ color: paleSpringBud }}>
                or
              </span>
              <div className="flex-grow border-t border-white/30"></div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="mt-4 w-full py-2 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 transition disabled:opacity-50"
            >
              <FaGoogle className="h-5 w-5 inline-block mr-2" />
              {loading ? 'Signing in with Google...' : 'Sign in with Google'}
            </button>

            <p className="mt-6 text-center text-sm" style={{ color: paleSpringBud }}>
              Don't have an account?{' '}
              <Link to="/signup" className="hover:underline" style={{ color: paleSpringBud }}>
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
