'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/src/types/product';
import styles from './HomePage.module.css';
import User from '../components/User';

interface CartItem {
  productId: string;
  quantity: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

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

  const updateCart = (productId: string, delta: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === productId);

      if (existingItem) {
        const updatedQuantity = Math.max(existingItem.quantity + delta, 0);
        if (updatedQuantity === 0) {
          return prevCart.filter((item) => item.productId !== productId);
        }
        return prevCart.map((item) =>
          item.productId === productId ? { ...item, quantity: updatedQuantity } : item
        );
      } else if (delta > 0) {
        return [...prevCart, { productId, quantity: 1 }];
      }

      return prevCart;
    });
  };

  const getQuantity = (productId: string): number => {
    return cart.find((item) => item.productId === productId)?.quantity || 0;
  };

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
                  <th className={styles.th}>In Cart</th>
                  <th className={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className={styles.tr}>
                    <td className={styles.td}>{product.name}</td>
                    <td className={styles.td}>{product.quantity}</td>
                    <td className={styles.td}>${product.price.toFixed(2)}</td>
                    <td className={styles.td}>{getQuantity(product.id)}</td>
                    <td className={styles.td}>
                      <button
                        onClick={() => updateCart(product.id, -1)}
                        className={styles.cartButton}
                      >
                        −
                      </button>
                      <button
                        onClick={() => updateCart(product.id, 1)}
                        className={styles.cartButton}
                      >
                        +
                      </button>
                    </td>
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
