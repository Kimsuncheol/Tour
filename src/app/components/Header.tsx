'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import MobileMenuOverlay from './MobileMenuOverlay';
import AvatarDropdown from './AvatarDropdown';

export default function Header() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <>
      <header className="w-full px-4 py-3 h-fit flex items-center justify-between bg-white shadow-sm">
        {/* Hamburger Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Menu"
        >
          <span className={`w-6 h-0.5 bg-gray-800 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Auth Section */}
        <AvatarDropdown
          user={user}
          signOut={signOut}
          onSignInClick={() => setIsSignInOpen(true)}
        />
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Modals */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onOpenSignUp={() => {
          setIsSignInOpen(false);
          setIsSignUpOpen(true);
        }}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onOpenSignIn={() => {
          setIsSignUpOpen(false);
          setIsSignInOpen(true);
        }}
      />
    </>
  );
}
