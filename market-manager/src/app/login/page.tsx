'use client';

import { useState } from 'react';
import { auth, db } from '@/src/lib/firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import styles from './LoginPage.module.css';

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
      await syncCustomer(userCred.user);
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
      await syncCustomer(userCred.user);
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
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h2 className={styles.heading}>Login</h2>

        <form onSubmit={handleEmailLogin} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Login with Email
          </button>
        </form>

        <button onClick={handleGoogleLogin} className={styles.googleButton}>
          Login with Google
        </button>

        <p>
          Don’t have an account?{' '}
          <a href="/signup" className={styles.link}>
            Create one
          </a>
        </p>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
