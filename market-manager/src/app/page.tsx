'use client';

import { useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Home() {
  useEffect(() => {
    console.log('Firebase Auth:', auth);
    console.log('Firebase DB:', db);

    // Optional: Check if someone is logged in
    onAuthStateChanged(auth, (user) => {
      console.log('Current user:', user);
    });
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Store Manager</h1>
      <p>Check your browser console for Firebase logs.</p>
    </main>
  );
}
