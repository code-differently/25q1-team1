'use client';

import Slideshow from '../components/Slideshow';
import { useEffect, useState } from 'react';
import { Product } from '@/src/types/product';
import styles from './HomePage.module.css';
import Image from 'next/image';
import User from '../components/User';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error calling fruit API:', error);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${isShrunk ? styles.shrunk : ''}`}>
        <div className={styles.logoWrapper}>
          <Image
            src="/images/transparentcrate.png"
            alt="ThymeCrate Logo"
            width={900}
            height={500}
            className={`${styles.logo} ${isShrunk ? styles.logoShrunk : ''}`}
            priority
          />
        </div>
        <User />
      </header>

      <main className={styles.container}>
        <section className={styles.section}>
        <Slideshow />   {/* ✅ Add this line right here */}

          <h1 className={styles.heading}>
            The Produce Junction
          </h1>
          <p className={styles.message}>
            Browse their selection of high-quality, locally-sourced products.
          </p>

          {products.length > 0 ? (
            <div className={styles.productGrid}>
              {products.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImage}>
                    <img
                      src={product.imageUrl || "/images/placeholder.png"}
                      alt={product.name}
                    />
                  </div>
                  <div className={styles.productContent}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productCategory}>Category: {product.category || 'General'}</p>
                    <p className={styles.productDescription}>
                      {product.description || 'No description provided.'}
                    </p>
                    <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                    <p className={styles.productStock}>{product.quantity} in stock</p>
                    <button className={styles.addToCart}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.message}>No products available.</p>
          )}
        </section>
      </main>
    </>
  );
}