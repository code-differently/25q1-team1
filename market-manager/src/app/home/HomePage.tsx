'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/src/types/product';
import styles from './HomePage.module.css';
import User from '../components/User';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});

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

  const changeQuantity = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 0;
      const updated = Math.max(current + delta, 0);
      return {
        ...prev,
        [productId]: updated,
      };
    });
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity === 0) return;
  
    // For now -- later replace this with saving to Firestore
    console.log('Adding to cart:', { ...product, quantity });
  
    setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
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
                  <th className={styles.th}>Selected</th>
                  <th className={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className={styles.tr}>
                  <td className={styles.td}>{product.name}</td>
                  <td className={styles.td}>{product.quantity}</td>
                  <td className={styles.td}>${product.price.toFixed(2)}</td>
                  <td className={styles.td}>
                    <div className={styles.quantityControl}>
                      <button onClick={() => changeQuantity(product.id, -1)} className={styles.cartButton}>−</button>
                      <span className={styles.quantityDisplay}>{quantities[product.id] || 0}</span>
                      <button onClick={() => changeQuantity(product.id, 1)} className={styles.cartButton}>+</button>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <button
                      className={styles.cartButton}
                      onClick={() => handleAddToCart(product)}
                      disabled={(quantities[product.id] || 0) === 0}
                    >
                      Add to Cart
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