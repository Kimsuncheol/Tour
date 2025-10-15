'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { isSignInWithEmailLink } from 'firebase/auth';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

export default function CompleteEmailLinkPage() {
  const router = useRouter();
  const { completeEmailLinkSignIn } = useAuth();
  const { showToast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const href = window.location.href;
        // Validate the inbound email link before proceeding.
        if (!isSignInWithEmailLink(auth, href)) {
          throw new Error('Invalid or expired sign-in link.');
        }

        // Restore the stored email or fall back to a user prompt if missing.
        let email = window.localStorage.getItem('emailForSignIn') || '';
        if (!email) {
          email = window.prompt('Enter your email to finish sign-in') || '';
        }
        if (!email) throw new Error('Email is required to finish sign-in.');

        await completeEmailLinkSignIn(email);
        showToast({
          message: 'Signed in successfully.',
          severity: 'success',
        });
        router.replace('/');
      } catch (error: unknown) {
        const message =
          error instanceof Error && error.message
            ? error.message
            : 'Failed to complete sign-in.';
        setError(message);
        showToast({
          message,
          severity: 'error',
        });
      } finally {
        setBusy(false);
      }
    })();
  }, [router, completeEmailLinkSignIn, showToast]);

  if (busy || error) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-20 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 shadow-inner shadow-black/30">
              {!error ? (
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              ) : (
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 text-rose-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01m-6.938-2a9 9 0 1 1 13.856 2.708A8.963 8.963 0 0 1 12 21a8.963 8.963 0 0 1-6.928-3.292"
                  />
                </svg>
              )}
            </span>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                Email Sign-In
              </p>
              <h1 className="text-2xl font-semibold">
                {error ? 'We ran into an issue' : 'Finishing things up'}
              </h1>
            </div>
          </div>

          {!error ? (
            <div className="space-y-4 text-sm text-white/70">
              <p>We’re verifying your email link and getting everything ready.</p>
              <p className="flex items-center gap-2">
                <span className="relative inline-flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                This will only take a moment.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-sm text-white/70">
              <p className="text-base font-medium text-white">{error}</p>
              <p>
                Double-check the link in your inbox or request a fresh email to try again.
              </p>
              <button
                type="button"
                onClick={() => router.replace('/auth/sign-in')}
                className="w-full rounded-xl bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white"
              >
                Go back to sign-in
              </button>
            </div>
          )}
        </div>
      </main>
    );
  }

  return null;
}
