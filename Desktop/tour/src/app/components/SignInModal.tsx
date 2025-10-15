'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import Modal from './auth/Modal';
import AuthMethodSelector from './auth/AuthMethodSelector';
import EmailLinkForm from './auth/EmailLinkForm';
import GoogleAuthButton from './auth/GoogleAuthButton';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignUp: () => void;
}

export default function SignInModal({ isOpen, onClose, onOpenSignUp }: SignInModalProps) {
  const { signInWithGoogle, sendEmailLink } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState<'email-link' | 'google'>('email-link');
  const [loading, setLoading] = useState(false);

  const handleEmailLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendEmailLink(email);
      showToast({
        message: 'Sign-in link sent! Check your email.',
        severity: 'success',
      });
      setEmail('');
    } catch (err) {
      showToast({
        message: err instanceof Error ? err.message : 'Failed to send sign-in link',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      await signInWithGoogle();
      showToast({
        message: 'Signed in with Google. Welcome back!',
        severity: 'success',
      });
      onClose();
    } catch (err) {
      showToast({
        message: err instanceof Error ? err.message : 'Failed to sign in with Google',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome back" subtitle="Sign in to your account">
      <AuthMethodSelector method={method} onMethodChange={setMethod} />

      {method === 'email-link' && (
        <EmailLinkForm
          email={email}
          onEmailChange={setEmail}
          onSubmit={handleEmailLinkSignIn}
          loading={loading}
          buttonText="Send sign-in link"
          loadingText="Sending..."
        />
      )}

      {method === 'google' && (
        <GoogleAuthButton
          onClick={handleGoogleSignIn}
          loading={loading}
          buttonText="Continue with Google"
          loadingText="Signing in..."
        />
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <button
            onClick={onOpenSignUp}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </Modal>
  );
}
