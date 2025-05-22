'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCartFromFirestore, removeProductFromCart } from '@/src/lib/cart';
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

  const handleRemove = async (productId: string) => {
    if (!user?.uid) return;
  
    try {
      await removeProductFromCart(user.uid, productId);
      const updatedCart = await getCartFromFirestore(user.uid);
      setItems(updatedCart);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };
  

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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}><strong>Total</strong></td>
                <td><strong>${total.toFixed(2)}</strong></td>
                <td colSpan={1}></td>
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
