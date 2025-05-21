'use client';

import Slideshow from '../components/Slideshow';
import { useEffect, useState } from 'react';
import { Product } from '@/src/types/product';
import styles from './HomePage.module.css';
import Image from 'next/image';
import User from '../components/User';
import { addProductToCart } from '@/src/lib/cart';
import { auth } from '@/src/lib/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isShrunk, setIsShrunk] = useState(false);
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});

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

  const handleAddToCart = async (product: Product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity === 0) return;
  
    const user = auth.currentUser;
    if (!user) {
      toast.error('Please log in to add items to your cart.');
      return;
    }
  
    try {
      await addProductToCart(user.uid, product, quantity);
      toast.success(`Added ${quantity} of ${product.name} to cart!`);
      setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
    } catch (err) {
      console.error(err);
      toast.error('Failed to add to cart.');
    }
  };
  
  

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
          <Slideshow />

          <h1 className={styles.heading}>The Produce Junction</h1>
          <p className={styles.message}>
            Browse their selection of high-quality, locally-sourced products.
          </p>

          {products.length > 0 ? (
            <div className={styles.productGrid}>
              {products.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImage}>
                    <img
                      src={`/images/${product.img}` || "/images/placeholder.png"}
                      alt={product.name}
                    />
                  </div>
                  <div className={styles.productContent}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productCategory}>Category: {product.category || 'General'}</p>

                    {/* MOVE quantity controls here */}
                    <div className={styles.quantityControl}>
                      <button onClick={() => changeQuantity(product.id, -1)} className={styles.cartButton}>−</button>
                      <span className={styles.quantityDisplay}>{quantities[product.id] || 0}</span>
                      <button onClick={() => changeQuantity(product.id, 1)} className={styles.cartButton}>+</button>
                    </div>

                    <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                    <p className={styles.productStock}>{product.quantity} in stock</p>

                    <button
                      className={styles.addToCart}
                      onClick={() => handleAddToCart(product)}
                      disabled={(quantities[product.id] || 0) === 0}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.message}>No products available.</p>
          )}
        </section>
      </main>
      <ToastContainer />
    </>
  );
}