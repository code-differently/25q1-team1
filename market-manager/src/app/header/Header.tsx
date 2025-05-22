'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import User from '../components/User/User';
import styles from '../header/header.module.css';

const Header = () => {
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isShrunk ? styles.shrunk : ''}`}>
      <div className={styles.logoWrapper}>
        <Link href="/">
          <Image
            src="/images/transparentcrate-cropped.png"
            alt="ThymeCrate Logo"
            width={isShrunk ? 100 : 100}
            height={isShrunk ? 50 : 100}
            className={`${styles.logo} ${isShrunk ? styles.logoShrunk : ''}`}
            priority
          />
        </Link>
      </div>
      <User />
    </header>
  );
};

export default Header;
