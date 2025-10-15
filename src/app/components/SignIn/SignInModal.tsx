'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
} from 'firebase/auth';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignUp: () => void;
}

export default function SignInModal({ isOpen, onClose, onOpenSignUp }: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState<'email-link' | 'google'>('email-link');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleEmailLinkSignIn = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const actionCodeSettings = {
        url: window.location.href,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setMessage('Sign-in link sent! Check your email.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send sign-in link');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'email-link') {
      handleEmailLinkSignIn();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-96 p-4 rounded-xl bg-white shadow-2xl relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>

        {/* Error/Message Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
            {message}
          </div>
        )}

        {/* Method Selector */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMethod('email-link')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              method === 'email-link'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Email Link
          </button>
          <button
            onClick={() => setMethod('google')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              method === 'google'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Google
          </button>
        </div>

        {/* Email Link Method */}
        {method === 'email-link' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send sign-in link'}
            </button>
          </form>
        )}

        {/* Google Method */}
        {method === 'google' && (
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm hover:shadow flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>
        )}

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don`&apos;t have an account?{' '}
            <button
              onClick={onOpenSignUp}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
