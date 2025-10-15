'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  setPersistence,
  browserLocalPersistence,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { auth, db } from '@/lib/firebase';
import { auth, db } from '@/lib/firebase';
import { CustomizedUser } from '@/interfaces/userInterface';

interface AuthContextType {
  user: CustomizedUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  sendEmailLink: (email: string) => Promise<void>;
  completeEmailLinkSignIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomizedUser | null>(null);
  const [loading, setLoading] = useState(true);

  const ensureMemberDocument = async (authUser: User, method: 'email' | 'google') => {
    const memberRef = doc(db, 'members', authUser.uid);
    const memberSnapshot = await getDoc(memberRef);
    const timestamp = new Date().toISOString();

    // Make sure the Firestore record reflects the latest login method without clobbering role status.
    const sharedFields = {
      email: authUser.email ?? '',
      method,
      lastSignInAt: timestamp,
    };

    try {
      if (memberSnapshot.exists()) {
        await setDoc(memberRef, sharedFields, { merge: true });
      } else {
        await setDoc(
          memberRef,
          {
            ...sharedFields,
            status: 'user',
            createdAt: timestamp,
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error('Error syncing member document:', error);
    }
  };

  useEffect(() => {
    let unsubscribe: () => void = () => {};

    (async () => {
      try {
        // Ensure auth state is persisted across reloads/tabs before attaching listener
        await setPersistence(auth, browserLocalPersistence);
      } catch (e) {
        console.error('Failed to set auth persistence:', e);
      }

      unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const memberDoc = await getDoc(doc(db, 'members', user.uid));
            const status = memberDoc.exists() ? memberDoc.data()?.status || 'user' : 'user';
            setUser({ ...user, status } as CustomizedUser);
          } catch (error) {
            console.error('Error fetching user status:', error);
            setUser({ ...user, status: 'user' } as CustomizedUser);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    })();

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    await ensureMemberDocument(credential.user, 'google');
  };

  const sendEmailLink = async (email: string) => {
    const actionCodeSettings = {
      url: `${window.location.origin}/auth/complete`,
      handleCodeInApp: true,
    } as const;

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
  };

  const completeEmailLinkSignIn = async (email: string) => {
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      throw new Error('Invalid sign-in link');
    }
    const credential = await signInWithEmailLink(auth, email, window.location.href);
    await ensureMemberDocument(credential.user, 'email');
    window.localStorage.removeItem('emailForSignIn');
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    sendEmailLink,
    completeEmailLinkSignIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthGate({ children }: { children: ReactNode }) {
  const { loading } = useAuth();
  if (loading) return null; // or return a loader component
  return <>{children}</>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
