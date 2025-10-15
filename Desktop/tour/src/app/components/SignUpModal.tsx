'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Modal from './auth/Modal';
import AuthMethodSelector from './auth/AuthMethodSelector';
import EmailLinkForm from './auth/EmailLinkForm';
import GoogleAuthButton from './auth/GoogleAuthButton';
import Alert from './auth/Alert';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignIn: () => void;
}

export default function SignUpModal({ isOpen, onClose, onOpenSignIn }: SignUpModalProps) {
  const { signInWithGoogle, sendEmailLink } = useAuth();
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState<'email-link' | 'google'>('email-link');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailLinkSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await sendEmailLink(email);
      setMessage('Verification link sent! Check your email to complete sign-up.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send verification link');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');

    try {
      await signInWithGoogle();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create account" subtitle="Start your journey with us">
      {error && <Alert type="error" message={error} />}
      {message && <Alert type="success" message={message} />}

      <AuthMethodSelector method={method} onMethodChange={setMethod} />

      {method === 'email-link' && (
        <EmailLinkForm
          email={email}
          onEmailChange={setEmail}
          onSubmit={handleEmailLinkSignUp}
          loading={loading}
          buttonText="Send verification link"
          loadingText="Sending..."
        />
      )}

      {method === 'google' && (
        <GoogleAuthButton
          onClick={handleGoogleSignUp}
          loading={loading}
          buttonText="Continue with Google"
          loadingText="Signing up..."
        />
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onOpenSignIn}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>

      <p className="mt-6 text-xs text-center text-gray-500">
        By signing up, you agree to our{' '}
        <a href="#" className="text-blue-600 hover:underline">Terms</a>
        {' '}and{' '}
        <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
      </p>
    </Modal>
  );
}
