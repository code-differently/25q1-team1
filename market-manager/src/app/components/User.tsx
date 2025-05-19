'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/src/lib/firebase';
import useUser from '../hooks/useUser';

export default function User() {
  const user = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.refresh(); // Re-run server components + layout
  };

  return (
    <div style={{
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    }}>
      {user ? (
        <>
          <span style={{ fontWeight: 500 }}>
            Welcome, {user.displayName || user.email}
          </span>
          <Link href="/customerCart">
          <button style={{ padding: '0.5rem 1rem' }}>View Cart</button>
        </Link>
          <button
            onClick={handleLogout}
            style={{ padding: '0.5rem 1rem' }}
          >
            Logout
          </button>
        </>
      ) : (
        <Link href="/login">
          <button style={{ padding: '0.5rem 1rem' }}>Login</button>
        </Link>
      )}
    </div>
  );
}
