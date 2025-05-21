'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/src/lib/firebase';
import useUser from '../../hooks/useUser';
import styles from './User.module.css';

export default function User() {
  const user = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.refresh();
  };

  return (
    <div className={styles.wrapper}>
      {user ? (
        <>
          <span className={styles.welcomeText}>
            Welcome, {user.displayName || user.email}
          </span>
          
          {/* About button in front of the View Cart button */}
          <Link href="/about">
            <button className={styles.AboutButton}>About</button>
          </Link>
          
          <Link href="/customerCart">
            <button className={styles.button}>View Cart</button>
          </Link>
          
          <button onClick={handleLogout} className={styles.button}>
            Logout
          </button>
        </>
      ) : (
        <>
          {/* About button in front of the Login button */}
          <Link href="/about">
            <button className={styles.AboutButton}>About</button>
          </Link>

          <Link href="/login">
            <button className={styles.button}>Login</button>
          </Link>
        </>
      )}
    </div>
  );
}
