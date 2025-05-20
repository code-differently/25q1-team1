'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCartFromFirestore } from '@/src/lib/cart';
import useUser from '../hooks/useUser';
import { Product } from '@/src/types/product';
import styles from './CustomerCart.module.css';

export default function CustomerCart() {
  const user = useUser();
  const [items, setItems] = useState<(Product & { quantity: number })[]>([]);

  useEffect(() => {
    if (user?.uid) {
      getCartFromFirestore(user.uid)
        .then(setItems)
        .catch((err) => console.error('Error loading cart:', err));
    }
  }, [user]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h1 className={styles.heading}>Customer Cart</h1>

        {items.length === 0 ? (
          <p className={styles.message}>Your cart is empty.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}><strong>Total</strong></td>
                <td><strong>${total.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
        )}

        <Link href="/">
          <button className={styles.button}>Go to Home Page</button>
        </Link>
      </div>
    </div>
  );
}
