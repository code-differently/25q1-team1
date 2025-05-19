'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/src/types/product';
import styles from './HomePage.module.css';
import User from '../components/User';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fruit API response', data);
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error calling fruit API:', error);
      });
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.section}>
      <div className={styles.headerRow}>
        <h1 className={styles.heading}>
          🍓 Welcome to <span className={styles.headingHighlight}>Market Manager</span>
        </h1>
        <User />
      </div>
        {products.length > 0 ? (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Quantity</th>
                  <th className={styles.th}>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className={styles.tr}>
                    <td className={styles.td}>{product.name}</td>
                    <td className={styles.td}>{product.quantity}</td>
                    <td className={styles.td}>${product.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles.message}>No products available.</p>
        )}
      </section>
    </main>
  );
}
