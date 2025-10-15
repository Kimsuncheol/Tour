'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import Modal from './auth/Modal';
import AuthMethodSelector from './auth/AuthMethodSelector';
import EmailLinkForm from './auth/EmailLinkForm';
import GoogleAuthButton from './auth/GoogleAuthButton';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignIn: () => void;
}

export default function SignUpModal({ isOpen, onClose, onOpenSignIn }: SignUpModalProps) {
  const { signInWithGoogle, sendEmailLink } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState<'email-link' | 'google'>('email-link');
  const [loading, setLoading] = useState(false);

  const handleEmailLinkSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendEmailLink(email);
      showToast({
        message: 'Verification link sent! Check your email to complete sign-up.',
        severity: 'success',
      });
      setEmail('');
    } catch (err) {
      showToast({
        message: err instanceof Error ? err.message : 'Failed to send verification link',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);

    try {
      await signInWithGoogle();
      showToast({
        message: 'Signed up with Google. Welcome aboard!',
        severity: 'success',
      });
      onClose();
    } catch (err) {
      showToast({
        message: err instanceof Error ? err.message : 'Failed to sign up with Google',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create account" subtitle="Start your journey with us">
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
