'use client';

import { useState } from 'react';
import { auth } from '../../lib/firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { db } from '@/src/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function syncCustomer(user: User) {
    const customerRef = doc(db, 'customers', user.uid);
    const snapshot = await getDoc(customerRef);
  
    if (!snapshot.exists()) {
      await setDoc(customerRef, {
        id: user.uid,
        email: user.email,
        name: user.displayName || '',
        createdAt: new Date(),
      });
      console.log('Customer profile created');
    } else {
      console.log('Customer already exists');
    }
  }
  

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      await syncCustomer(userCred.user); // 👈 Add this line
      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCred = await signInWithPopup(auth, provider);
      await syncCustomer(userCred.user); // 👈 Add this line
      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };
  

  return (
    <div style={{ maxWidth: '400px', margin: '5rem auto', textAlign: 'center' }}>
  <h2 style={{ marginBottom: '2rem' }}>Login</h2>

  <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column' }}>
    <input
      type="email"
      placeholder="Email"
      value={email}
      required
      onChange={(e) => setEmail(e.target.value)}
      style={{ marginBottom: '1rem', padding: '0.5rem' }}
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      required
      onChange={(e) => setPassword(e.target.value)}
      style={{ marginBottom: '1rem', padding: '0.5rem' }}
    />
    <button type="submit" style={{ marginBottom: '1rem', padding: '0.75rem' }}>
      Login with Email
    </button>
  </form>

  <button
    onClick={handleGoogleLogin}
    style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#4285F4', color: '#fff' }}
  >
    Login with Google
  </button>

  <p style={{ marginTop: '1rem' }}>
    Don’t have an account?{' '}
    <a href="/signup" style={{ color: '#4285F4', textDecoration: 'underline', cursor: 'pointer' }}>
      Create one
    </a>
  </p>


    {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
  </div>

  );
}
