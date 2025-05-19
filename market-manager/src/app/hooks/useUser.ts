// src/hooks/useUser.ts
import { useEffect, useState } from 'react';
import { auth } from '@/src/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return user;
}
