'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/src/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import styles from './SignUpPage.module.css';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, 'customers', user.uid), {
        id: user.uid,
        email: user.email,
        name: name,
        createdAt: new Date(),
      });

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
      <h2 className={styles.heading}>Create Account</h2>
      <form onSubmit={handleSignUp} className={styles.form}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
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
        <button type="submit" className={styles.button}>Create Account</button>
        <a href="/login" className={styles.link}>Login instead</a>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
